<script>
  import GoogleButton from "./auth/GoogleButton.svelte";
  import {
    Header,
    HeaderNav,
    HeaderNavItem,
    HeaderGlobalAction,
    SkipToContent,
    HeaderUtilities,
    SideNav,
    SideNavItems,
    SideNavLink,
    SideNavDivider,
  } from "carbon-components-svelte";
  import {
    directorySize,
    fileCount,
    initialLoading,
    isAuthenticated,
    loading,
  } from "../stores";
  import { formatBytes } from "../helpers/formatting/formatBytes";
  import SettingsAdjust from "carbon-icons-svelte/lib/SettingsAdjust.svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";

  let isSideNavOpen = false;

  const navigateToFolder = () => {
    isSideNavOpen = false;

    initialLoading.set(true);
    loading.set(true);
    directorySize.set(0)
    fileCount.set(0)
  };
</script>

<header>
  <Header
    company="milkbox"
    href={$isAuthenticated ? "/drive/root" : "/"}
    bind:isSideNavOpen
    persistentHamburgerMenu
    on:click={navigateToFolder}
  >
    <svelte:fragment slot="skip-to-content">
      <SkipToContent />
    </svelte:fragment>
    <HeaderNav>
      {#if $page.route.id.startsWith("/drive/")}
        <HeaderNavItem
          text={`Directory Size: ${formatBytes($directorySize)}`}
        />
        <HeaderNavItem text={`Total Files: ${$fileCount}`} />
      {/if}
    </HeaderNav>
    <SideNav bind:isOpen={isSideNavOpen}>
      <SideNavItems>
        <SideNavLink
          text="My Drive"
          href="/drive/root"
          on:click={navigateToFolder}
        />
        <SideNavLink
          text="Shared Drives"
          href="/drive/shared-drives"
          on:click={navigateToFolder}
        />
        <SideNavDivider />
        <SideNavLink
          text="Shared With Me"
          href="/drive/shared-with-me"
          on:click={navigateToFolder}
        />
        <SideNavLink
          text="Starred"
          href="/drive/starred"
          on:click={navigateToFolder}
        />
        <SideNavLink
          text="Trash"
          href="/drive/trash"
          on:click={navigateToFolder}
        />
      </SideNavItems>
    </SideNav>

    <HeaderUtilities>
      <HeaderGlobalAction
        aria-label="Settings"
        icon={SettingsAdjust}
        on:click={() => goto("/settings")}
      />
      <GoogleButton />
    </HeaderUtilities>
  </Header>
</header>

<style>
  header {
    display: flex;
    justify-content: flex-end;
  }
</style>
