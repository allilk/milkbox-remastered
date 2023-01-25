<script>
  import {
    Column,
    Select,
    SelectItem,
    Grid,
    Row,
    Checkbox,
  } from "carbon-components-svelte";
  import { settings } from "../../stores";

</script>

<Grid>
  <Row>
    <Column>
      <h5>Loading Settings</h5>
    </Column>
  </Row>
  <br />
  <Row>
    <Column md={2}
      ><Checkbox labelText="Cache Locally (Beta)" disabled /></Column
    >
  </Row>
  <br />
  <Row>
    <Column md={2}>
      <Select
        labelText="Page Size"
        selected={$settings?.pageSize}
        on:change={({ target: { value } }) =>
          settings.set({ ...$settings, pageSize: value })}
      >
        <SelectItem value="50" />
        <SelectItem value="100" />
        <SelectItem value="250" />
        <SelectItem value="500" />
        <SelectItem value="1000" />
      </Select>
    </Column>
  </Row>
</Grid>
