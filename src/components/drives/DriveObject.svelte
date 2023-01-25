<script>
  import { goto } from "$app/navigation";
  import { ClickableTile, Column, Row } from "carbon-components-svelte";
  import { fileCount } from "../../stores";

  export let name, id;
</script>

<ClickableTile
  on:click={() => {
    fileCount.set(0);

    goto(`/drive/${id}`);
  }}
>
  <Row class="drive"><Column>{name}</Column></Row>
</ClickableTile>
