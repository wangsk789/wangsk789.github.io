        new Valine({
            el: '#vcomments',
            appId: 'Yn5DoP1nXtw6qIS2KTASpb2W-MdYXbMMI',
            appKey: '3E9izfNLmqlvNDXjgCOpfBoo',
			serverURLs: "https://valine.kevinkun.cn",
			meta: ['nick','mail'],
			requiredFields: ['nick'],
			lang:'en'
        })
		document.querySelector('#vcomments').addEventListener('click',e=>{

			if(e.target == document.querySelector('.vsubmit.vbtn')){
				let nick = document.querySelector('.vinput.vnick').value || '';
				let mail = document.querySelector('.vinput.vmail').value || '';
				let content = document.querySelector('.vinput.veditor').value || '';
				if(nick && content ){
					let realcontent = `用户: ${nick}<br>时间：${now()}<br>网址：${window.location.href}<br><br>评论：${content}`;
					let url = `https://qdhuayuan.net/other/email/sendmail.php?to=wangsk789@qq.com&subject=您有新评论&body=${realcontent}`;
					fetch(url);
				}
				
			}
		})
		function now(){
				var current = new Date();//实例化Date对象
				var y = current.getFullYear();//获取年份
				var m = current.getMonth() + 1;//获取月份，默认显示0-11，所以+1
				m = m < 10 ? ('0'+m) : m;
				var d = current.getDate();//获取日期
				var h = current.getHours();//获取时
				var mm = current.getMinutes();//获取分
				var s = current.getSeconds();//获取秒
				s = s < 10 ? ('0'+s) : s;
				var now = y +'-'+ m +'-'+ d +' '+ h +':'+ mm +':'+ s + '';
			return now;
		}