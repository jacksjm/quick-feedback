<script>
    import { createEventDispatcher } from "svelte";
    import ClassList from "./ClassList.svelte";

    let tab = 'class'

    const dispatch = createEventDispatcher();

    function onLogout() {
        dispatch("sessionDestroyed", { token: undefined });
    }

    function setTab(id) {
        tab = id
    }
</script>

<div class="uk-width-xlarge uk-margin-top">
    <nav class="uk-navbar-container" uk-navbar>
        <div class="uk-navbar-right">
            <ul class="uk-navbar-nav">
                <li>
                    <a 
                        href="javascript:void(0);"
                        on:click={onLogout}>
                        Logout
                    </a>
                </li>
            </ul>
        </div>
    </nav>
    {#if tab === 'class'}
        <ClassList/>
    {/if}
</div>
