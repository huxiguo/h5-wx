<template>
	<RouterView />
	<van-tabbar route placeholder safe-area-inset-bottom>
		<van-tabbar-item to="/" icon="smile-o">进出记录</van-tabbar-item>
		<van-tabbar-item to="/children" icon="user-circle-o">
			我的孩子
		</van-tabbar-item>
	</van-tabbar>
</template>

<script setup lang="ts"></script>
