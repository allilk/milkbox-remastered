<script>
  import { ClickableTile, Row, Column } from "carbon-components-svelte";
  import { settings } from "../../stores";
  import { readable } from "svelte/store";
  import { formatBytes } from "../../helpers/formatting/formatBytes";
  import { downloadFile } from "../../helpers/files/downloadFile";

  export let alternateName,
    name,
    size,
    id,
    mimeType,
    webViewLink,
    navigateToFolder;

  const isFolder = readable(
    mimeType && (mimeType.includes("shortcut") || mimeType.includes("folder"))
  );

  // on:contextmenu={(e) => {
  //   e.preventDefault();

  //   !$settings.customDownload
  //     ? window.open(webViewLink, "_blank")
  //     : downloadFile(name, id);
  // }}
</script>

<div>
  <ClickableTile
    on:click={$isFolder ? () => navigateToFolder(`/drive/${id}`) : () => {}}
    class={$settings.density === "Compact"
      ? "compact-density"
      : "normal-density"}
    {id}
  >
    <Row class={$isFolder ? "folder" : "file"} {id}>
      <Column class="name" sm={3} {id}
        >{alternateName ?? name}{$isFolder ? "/" : ""}</Column
      >
      <Column class="size" sm={1} {id}>{size ? formatBytes(size) : "-"}</Column>
    </Row>
  </ClickableTile>
</div>
