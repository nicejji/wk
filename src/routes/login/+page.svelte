<script lang="ts">
	let name = '';
	let password = '';

	$: validName = name.trim() && name.length < 10 && /^[a-zA-Z]*$/.test(name);
	$: validPassword = password.trim();
</script>

<form method="POST" action="">
	<div class="flex flex-col w-full h-full justify-center items-center">
		<div class="flex flex-col gap-3">
			<div class="flex flex-col">
				<span class="font-bold">Nickname</span>
				<input
					name="name"
					type="text"
					class="input input-bordered"
					class:input-error={!validName && name}
					bind:value={name}
				/>
				{#if !validName && name}
					<span class="text-sm text-error">Only letters allowed. Max length - 10.</span>
				{/if}
			</div>
			<div class="flex flex-col">
				<span class="font-bold">Password</span>
				<input
					name="password"
					type="password"
					class="input input-bordered"
					class:input-error={!validPassword && password}
					bind:value={password}
				/>
			</div>
			{#if !validPassword && password}
				<span class="text-sm text-error">Should contain at least 1 symbol.</span>
			{/if}
			<button class="btn" class:btn-disabled={!validPassword || !validName}>Authorize</button>
		</div>
	</div>
</form>
