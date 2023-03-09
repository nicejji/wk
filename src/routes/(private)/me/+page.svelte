<script lang="ts">
	import type { LayoutData } from '../$types';

	export let data: LayoutData;
</script>

<span class="text-success text-3xl font-bold">Successful login!</span>
<span>{data.user?.name}</span>
<span>{data.user?.password}</span>
