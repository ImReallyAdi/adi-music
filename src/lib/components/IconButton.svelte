<script lang="ts" module>
	import Button, { type AllowedButtonElement, type ButtonProps } from './Button.svelte'
	import Icon, { type IconType } from './icon/Icon.svelte'

	interface IconButtonProps<As extends AllowedButtonElement> extends ButtonProps<As> {
		tooltip: string
		icon?: IconType
		children?: Snippet
	}
</script>

<script lang="ts" generics="As extends AllowedButtonElement = 'button'">
	const { icon, children, kind = 'blank', ...rest }: IconButtonProps<As> = $props()
</script>

<Button
	{...rest}
	{kind}
	class={[
		'flex size-10 shrink-0 items-center justify-center rounded-full',
		rest.class,
		rest.disabled && 'opacity-38', /* M3 disabled opacity is 0.38 */
	]}
>
	{#if children}
		{@render children()}
	{:else if icon}
		<Icon type={icon} />
	{/if}
</Button>
