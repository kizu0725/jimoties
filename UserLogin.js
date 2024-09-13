// jQueryでフォームの切り替えをアニメーションで実装
$('.message a').click(function(){
   $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});

// ログイン機能
function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const resultMessage = document.getElementById("resultMessage");

  // メッセージエリアを初期化
  resultMessage.style.display = 'none';
  resultMessage.textContent = '';
  
  // 未入力チェック
  if (!email || !password) {
    showMessage("メールアドレスとパスワードは必須項目です。", "#f44336");
    return;
  }

  // APIを通じてログインを行う
  fetch("https://m3h-minaki-jimoties.azurewebsites.net/api/UserLogin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      Email: email,
      User_password: password
    })
  })
  .then(response => {
    if (response.status === 200) {
      return response.json();
    } else if (response.status === 401) {
      throw new Error("ログイン失敗: 401 Unauthorized");
    } else {
      return response.text().then(text => { throw new Error(text); });
    }
  })
  .then(data => {
    if (data.users && data.users.length > 0) {
      // ローカルストレージにログイン情報を保存
      sessionStorage.setItem('user_ID', data.users[0].user_ID);

      // 直接マイページへリダイレクト
      window.location.href = "index.html";
    } else {
      showMessage("メールアドレスまたはパスワードが間違っています。", "#f44336");
    }
  })
  .catch(error => {
    console.error("エラー:", error);
    showMessage("ログイン中にエラーが発生しました。エラー内容: " + error.message, "#f44336");
  });
}

// メッセージ表示用関数
function showMessage(message, backgroundColor) {
  const resultMessage = document.getElementById("resultMessage");
  resultMessage.textContent = message;
  resultMessage.style.backgroundColor = backgroundColor;
  resultMessage.style.display = 'block';
}

// アカウント作成機能
function register() {
  const user_name = document.getElementById("user_name").value;
  const user_password = document.getElementById("user_password").value;
  const mail = document.getElementById("mail").value;
  const address = document.getElementById("address").value;
  const telephone = document.getElementById("telephone").value;
  const email = document.getElementById("email").value;

  // 未入力チェック
  if (!user_name || !user_password || !email || !mail || !address || !telephone) {
    showMessage("全ての項目は必須です。", "#f44336");
    return;
  }

  // APIを通じてデータベースに登録する
  fetch("https://m3h-nishizawa-jimotiesapi.azurewebsites.net/api/RegisterUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user_name: user_name,
      user_password: user_password,
      mail: mail,
      address: address,
      telephone: telephone,
      email: email
    })
  })
  .then(response => {
    if (response.status === 200 || response.status === 201) {
      return response.json();
    } else {
      return response.text().then(text => { throw new Error(text); });
    }
  })
  .then(data => {
    if (data.status === "Success") {
      // ローカルストレージにログイン情報を保存
      localStorage.setItem('userId', data.id);

      // 2秒後に「ご登録ありがとうございましたページ」にリダイレクト
      setTimeout(() => {
        window.location.href = "Thankyou.html";
      }, 2000);
    } else {
      showMessage("アカウント作成に失敗しました。", "#f44336");
    }
  })
  .catch(error => {
    console.error("エラー:", error);
    showMessage("アカウント作成中にエラーが発生しました。エラー内容: " + error.message, "#f44336");
  });
}

// ローカルストレージに保存されたユーザー情報を取得
function loadUserData() {
  const userId = localStorage.getItem('user_ID');
  
  if (userId) {
    console.log("現在のユーザーID:", userId);
  } else {
    console.log("ログイン情報がありません。");
  }
}

// ページ読み込み時にユーザーデータを確認
window.onload = loadUserData;