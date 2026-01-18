<script lang="ts">
	const player = usePlayer()
</script>

<md-slider
	value={player.volume}
	oninput={(e: any) => player.volume = e.target.value}
	min="0"
	max="100"
	class="w-full"
></md-slider>
