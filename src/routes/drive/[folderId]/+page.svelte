<script>
  import { getFiles } from "../../../helpers/files/getFiles";
  import {
    isAuthenticated,
    directorySize,
    fileCount,
    settings,
    initialLoading,
    loading
  } from "../../../stores";
  import { derived, writable } from "svelte/store";
  import { page } from "$app/stores";
  import FileObject from "../../../components/files/FileObject.svelte";
  import { Grid, ProgressBar } from "carbon-components-svelte";
  import { getParentFolder } from "../../../helpers/files/getParentFolder";
  import { afterUpdate, onDestroy } from "svelte";
  import { createFileList } from "../../../helpers/files/stores";
  import { goto } from "$app/navigation";

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

  const navigateToFolder = (folder) => goto(folder)

  page.subscribe((pg) => {
    loading.set(true);
    initialLoading.set(true);
    fileCount.set(0);
    directorySize.set(0);
    lazyLoadedFileList.set([]);
  })
</script>

{#if $loadedFileList}
  <Grid>
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
  </Grid>
{/if}
