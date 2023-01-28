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
      <h5>Loading</h5>
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
  <br />
  <Row>
    <Column>
      <h5>Display</h5>
    </Column>
  </Row>
  <br />
  <Row>
    <Column md={2}>
      <Select
        labelText="Row Density"
        selected={$settings?.density}
        on:change={({ target: { value } }) =>
          settings.set({ ...$settings, density: value })}
      >
        <SelectItem value="Normal" />
        <SelectItem value="Compact" />
      </Select>
    </Column>
  </Row>
  <br />
  <Row>
    <Column>
      <h5>File Management</h5>
    </Column>
  </Row>
  <br />
  <Row>
    <Column md={2}
      ><Checkbox
        labelText="Direct Download (Slow)"
        checked={$settings?.customDownload}
        on:change={() =>
          settings.set({
            ...$settings,
            customDownload: !$settings?.customDownload,
          })}
      /></Column
    >
  </Row>
</Grid>
