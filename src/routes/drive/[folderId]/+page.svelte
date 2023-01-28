<script>
  import { getFiles } from "../../../helpers/files/getFiles";
  import {
    isAuthenticated,
    directorySize,
    fileCount,
    settings,
    initialLoading,
    loading,
  } from "../../../stores";
  import { derived, writable } from "svelte/store";
  import { page } from "$app/stores";
  import FileObject from "../../../components/files/FileObject.svelte";
  import {
    Column,
    Grid,
    ProgressBar,
    Row,
    Breadcrumb,
    BreadcrumbItem,
    ContextMenu,
    ContextMenuOption,
  } from "carbon-components-svelte";
  import { getParentFolder } from "../../../helpers/files/getParentFolder";
  import { afterUpdate, onDestroy } from "svelte";
  import { createFileList } from "../../../helpers/files/stores";
  import { goto } from "$app/navigation";
  import RowView from "carbon-icons-svelte/lib/Row.svelte";
  import GridView from "carbon-icons-svelte/lib/Grid.svelte";
  import { downloadFile } from "../../../helpers/files/downloadFile";

  const nextPageToken = writable(null);
  const parentFolder = writable({
    name: "..",
    id: "",
    mimeType: "folder",
  });

  let timeOutId;
  const fileList = createFileList(writable([]));
  const loadedFileList = derived(
    [fileList, isAuthenticated, page],
    ([fileList, $isAuthenticated, $page], set) => {
      if ($isAuthenticated && $page.params.folderId) {
        if (timeOutId) clearTimeout(timeOutId);

        timeOutId = setTimeout(async () => {
          lazyLoadedFileList.set([]);

          const folderId = $page.params.folderId;

          const res = await getFiles(folderId, undefined, $settings.pageSize);
          const parent = await getParentFolder(folderId);

          res?.nextPageToken
            ? nextPageToken.set(res.nextPageToken)
            : loading.set(false);

          initialLoading.set(false);
          parentFolder.set(parent);

          let dirSize = 0;
          res.files.forEach((file) => {
            dirSize += parseInt(file.size) || 0;
          });

          fileCount.set(res.files.length);
          directorySize.set(dirSize);

          return set(res.files);
        }, 500);
      }
    },
    []
  );

  const lazyLoadedFileList = writable([]);

  const unsubscribeNextToken = nextPageToken.subscribe(async (token) => {
    if (token) {
      const res = await getFiles(
        $page.params.folderId,
        token,
        $settings.pageSize
      );

      lazyLoadedFileList.update((old) => {
        res?.nextPageToken
          ? nextPageToken.set(res.nextPageToken)
          : loading.set(false);

        let dirSize = $directorySize;
        res.files.forEach((file) => {
          dirSize += parseInt(file.size) || 0;
        });
        fileCount.set($fileCount + res.files.length);
        directorySize.set(dirSize);

        return [...old, ...res.files];
      });
    }
  });

  afterUpdate(() => {
    nextPageToken && nextPageToken.set(null);
  });
  onDestroy(unsubscribeNextToken);

  const navigateToFolder = (folder) => goto(folder);

  page.subscribe(() => {
    loading.set(true);
    initialLoading.set(true);
    fileCount.set(0);
    directorySize.set(0);
    lazyLoadedFileList.set([]);
    parentFolder.set({ ...$parentFolder, name: "" });
    nextPageToken.set();
  });

  let target;
  const selectedItem = writable("");
</script>

<ContextMenu
  {target}
  on:open={(e) => {
    selectedItem.set("");
    if (e.detail.id.length > 7) {
      selectedItem.set(e.detail.id);
    }
  }}
  on:close={() => selectedItem.set("")}
>
  {#if $selectedItem.length > 0}
    <ContextMenuOption
      indented
      labelText="Download"
      on:click={() => {
        const selectedFile = [...$loadedFileList, ...$lazyLoadedFileList].find(
          (file) => file.id === $selectedItem
        );

        !$settings.customDownload ||
        selectedFile.mimeType.includes("shortcut") ||
        selectedFile.mimeType.includes("folder")
          ? window.open(selectedFile.webViewLink, "_blank")
          : downloadFile(selectedFile.name, $selectedItem);
      }}
    />
  {/if}
</ContextMenu>

<Grid>
  <Row padding="0 0 2rem 0" class="parent-folder-header">
    <Column xs={3}>
      <Breadcrumb noTrailingSlash>
        {#if $page.params.folderId !== "root" && $parentFolder?.name !== "My Drive"}
          <BreadcrumbItem
            href={!$initialLoading ? `/drive/${$parentFolder?.id}` : undefined}
          >
            My Drive
          </BreadcrumbItem>
        {/if}
        <BreadcrumbItem isCurrentPage>
          {$parentFolder?.name}
        </BreadcrumbItem>
      </Breadcrumb>
    </Column>
    <Column class="view" xs={1}>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        on:click={() =>
          settings.set({
            ...settings,
            layout: $settings?.layout === "row" ? "grid" : "row",
          })}
      >
        <svelte:component
          this={$settings?.layout === "row" ? RowView : GridView}
          class="view-icon"
          on:click
        />
      </div>
    </Column>
  </Row>
</Grid>

{#if $loadedFileList}
  <Grid>
    <div class={$settings?.layout === "grid" ? "grid-layout" : ""}>
      {#if !$initialLoading}
        <svelte:component
          this={FileObject}
          {...$parentFolder}
          {navigateToFolder}
        />
        {#each $loadedFileList as file}
          <svelte:component this={FileObject} {...file} {navigateToFolder} />
        {/each}
        {#each $lazyLoadedFileList as file}
          <svelte:component this={FileObject} {...file} {navigateToFolder} />
        {/each}
      {/if}

      {#if $initialLoading || $loading}
        <ProgressBar helperText="Loading..." size="sm" />
      {/if}
    </div>
  </Grid>
{/if}
