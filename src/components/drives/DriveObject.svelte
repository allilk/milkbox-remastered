<script>
  import { ClickableTile, Column, Row } from "carbon-components-svelte";

  export let name;
</script>

<ClickableTile>
  <Row class="drive"><Column>{name}</Column></Row>
</ClickableTile>
