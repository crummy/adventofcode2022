<script>
import {primary, secondary, tertiary} from "./colours";

</script>

<style>
    .container {
        margin: 0 auto;
        max-width: 800px;
        border-radius: 4px;
        padding: 1em;
        position: relative;
    }

    :global(.container h1) {
        margin-top: 0;
    }

    :global(.container label) {
        border: 1px solid black;
        box-shadow: 0 0 2px;
        margin: 0.5em;
        padding: 0.5em;
        position: absolute;
        right: 0;
        top: 0;
    }

    :global(html) {
        height:100%;
        background-image: linear-gradient(to right top, #87ba4d, #65a85a, #4b9562, #3b8164, #386c5f);
        background-attachment: fixed;
    }
</style>

<div class="container" style={`--primary-color: ${primary}; --secondary-color: ${secondary}; --tertiary-color: ${tertiary}; background-color: ${primary}`}>
<slot/>
</div>