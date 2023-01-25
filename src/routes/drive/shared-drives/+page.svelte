<script>
  import { Grid, ProgressBar, Search } from "carbon-components-svelte";
  import { getDrives } from "../../../helpers/drives/getDrives";
  import { createFileList } from "../../../helpers/files/stores";
  import {
    fileCount,
    initialLoading,
    isAuthenticated,
    loading,
    settings,
  } from "../../../stores";
  import { afterUpdate, onDestroy } from "svelte";
  import { derived, writable } from "svelte/store";
  import DriveObject from "../../../components/drives/DriveObject.svelte";

  const nextPageToken = writable(null);

  let timeOutId;
  const driveList = createFileList(writable([]));
  const loadedDriveList = derived(
    [driveList, isAuthenticated],
    ([driveList, $isAuthenticated], set) => {
      if ($isAuthenticated) {
        if (timeOutId) clearTimeout(timeOutId);

        timeOutId = setTimeout(async () => {
          const res = await getDrives(undefined, $settings.pageSize);

          res?.nextPageToken
            ? nextPageToken.set(res.nextPageToken)
            : loading.set(false);

          initialLoading.set(false);
          fileCount.set(res.drives.length);

          return set(res.drives);
        }, 500);
      }
    },
    []
  );

  const lazyLoadedDriveList = writable([]);

  const unsubscribeNextToken = nextPageToken.subscribe(async (token) => {
    if (token) {
      const res = await getDrives(token, $settings.pageSize);

      lazyLoadedDriveList.update((old) => {
        res?.nextPageToken
          ? nextPageToken.set(res.nextPageToken)
          : loading.set(false);

        fileCount.set($fileCount + res.drives.length);

        return [...old, ...res.drives];
      });
    }
  });

  afterUpdate(() => {
    nextPageToken && nextPageToken.set(null);
  });
  onDestroy(unsubscribeNextToken);

  let debounceTimer;
  const searchValue = writable("")
  const debounceOnChange = ({target: {value}}) => {
    if (debounceTimer) clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
      searchValue.set(value)
    }, 500);
  };
</script>

{#if $loadedDriveList}
  <Grid>
    <Search on:keyup={debounceOnChange} disabled/>
    <br />
    {#if !$initialLoading}
      {#each $loadedDriveList as drive}
        <svelte:component this={DriveObject} {...drive} />
      {/each}
      {#each $lazyLoadedDriveList as drive}
        <svelte:component this={DriveObject} {...drive} />
      {/each}
    {/if}
    {#if $initialLoading || $loading}
      <ProgressBar helperText="Loading..." size="sm" />
    {/if}
  </Grid>
{/if}
