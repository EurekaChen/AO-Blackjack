<script lang="ts">
	import { createDataItemSigner } from '@permaweb/aoconnect';
	import { message } from '$lib/store/Setting';
	import { Waiting } from '$lib/store/Waiting';

	//21点进程
	let process = 'lKZ6SpyB_V8YwewgPmctsRDWaKQaLY3fP_3s-AnjzAs';

	let data = 'Players = Players or {}';

	let files;

	function handleFileChange(event) {
		//const files = event.target.files;
		console.log("文件个数:",files.length)
		console.log("files:",files)
		let data;
		if (files) {
			for(let file in files){ 
				const reader = new FileReader();
				reader.onload = (e) => {
					console.log(e.target.result);
					//data += reader.result;
					//data+=event.target.result
				};
				console.log(file);
				reader.readAsText(file);
			}
		}


	}

	//管理tag
	let tags = [{ name: 'Action', value: 'Eval' }];

	//发送信息
	async function sendMessage() {
		$Waiting.isWaiting = true;
		$Waiting.alertClass = 'primary';
		$Waiting.waitingText = '加入代码中...';
		let result = await message({
			process,
			tags,
			signer: createDataItemSigner(globalThis.arweaveWallet),
			data
		});
        $Waiting.alertClass="success"
        $Waiting.confirm=true;
        $Waiting.waitingText="加载成功，MsgId为 <br />"+result

		//$Waiting.isWaiting = false;
		console.log(result);
	}
</script>

<div class="row">
	<!-- 开始列 -->
	<div class="col-12">
		<!-- 可关闭面板 -->
		<div class="card mb-4">
			<div class="card-header">
				<h3 class="card-title">加载代码</h3>
			</div>

			<div class="card-body col-9">
				<div class="mb-3">
					<label for="process" class="fs-5">21点进程(ProcessID)</label>
					<div>{process}</div>
				</div>
				<div class="mb-3">
					<label for="floatingTextarea" class="fs-5">LUA代码内容</label>
					<textarea class="form-control" rows="6" placeholder="data" id="data" bind:value={data}
					></textarea>
					<div class="input-group">
						<input type="file"  multiple bind:files class="form-control" id="uploadFile" on:change={handleFileChange} />
						<label class="input-group-text" for="uploadFile">从文件加载</label>
					</div>
				</div>
				<hr />
				<div class="form-group">
					<input type="submit" value="加载代码" class="btn btn-primary" on:click={sendMessage} />
				</div>
			</div>

			<div class="card-footer">
				<!--底部预留内容-->
			</div>
		</div>		
	</div>
</div>
