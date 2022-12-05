<script>
import {primary, secondary, tertiary} from "./colours";

</script>

<style>
    .container {
        margin: 0 auto;
        max-width: 800px;
    }

    :global(html) {
        height:100%;
        background-image: linear-gradient(to right top, #87ba4d, #65a85a, #4b9562, #3b8164, #386c5f);
        background-attachment: fixed;
    }
</style>

<div class="container" style={`--primary-color: ${primary}; --secondary-color: ${secondary}; --tertiary-color: ${tertiary}`}>
<slot/>
</div>