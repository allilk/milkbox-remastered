<script>
  import { ClickableTile, Row, Column } from "carbon-components-svelte";
  import { settings } from "../../stores";
  import { readable } from "svelte/store";
  import { formatBytes } from "../../helpers/formatting/formatBytes";

  export let alternateName, name, size, id, mimeType, navigateToFolder;

  const isFolder = readable(
    mimeType && (mimeType.includes("shortcut") || mimeType.includes("folder"))
  );
</script>

<ClickableTile
  on:click={$isFolder ? () => navigateToFolder(`/drive/${id}`) : () => {}}
  class={$settings.density === "Compact" ? "compact-density" : "normal-density"}
>
  <Row class={$isFolder ? "folder" : "file"}>
    <Column class="name" sm={3}
      >{alternateName ?? name}{$isFolder ? "/" : ""}</Column
    >
    <Column class="size" sm={1}>{size ? formatBytes(size) : "-"}</Column>
  </Row>
</ClickableTile>
