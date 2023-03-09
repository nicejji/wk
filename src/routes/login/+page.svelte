<script lang="ts">
	import type { ActionData } from './$types';

	export let form: ActionData;

	let name = '';
	let password = '';
	let err = form?.incorrect;

	$: validName = name.trim() && name.length < 10 && /^[a-zA-Z]*$/.test(name);
	$: validPassword = password.trim();
</script>

<div class="flex flex-col w-full h-full justify-center items-center">
	<form method="POST" action="">
		<div class="flex flex-col gap-3">
			<div class="flex flex-col">
				<span class="font-bold">Nickname</span>
				<input
					name="name"
					type="text"
					class="input input-bordered focus:outline-none"
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
					class="input input-bordered focus:outline-none"
					class:input-error={!validPassword && password}
					bind:value={password}
				/>
			</div>
			{#if !validPassword && password}
				<span class="text-sm text-error">Should contain at least 1 symbol.</span>
			{/if}
			<button class="btn" class:btn-disabled={!validPassword || !validName}>Authorize</button>
		</div>
	</form>
</div>

<div class="modal" class:modal-open={err}>
	<div class="modal-box">
		<h3 class="font-bold text-lg">Incorrect password or nickname.</h3>
		<p class="py-4">
			Looks like account with this nickname already exists, and password didn't match.
		</p>
		<div class="modal-action">
			<label for="my-modal">
				<button class="btn" on:click={() => (err = false)}>Try again.</button>
			</label>
		</div>
	</div>
</div>
