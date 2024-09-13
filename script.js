new Vue({
  el: '#app',
  vuetify: new Vuetify(),
  data() {
    return {
      userId: null, // 初期値はnull
      images: [
      'https://i.gyazo.com/5807ebb6796f049b40257dac460f428b.jpg',
      'https://i.gyazo.com/bc3157f5b5bee205dacee2088caeedc1.jpg',
      'https://m3hjimotiesphoto.blob.core.windows.net/famousphoto/152.jpg',
      'https://m3hjimotiesphoto.blob.core.windows.net/famousphoto/3.jpg',
      'https://m3hjimotiesphoto.blob.core.windows.net/famousphoto/70.jpg'],


      userPrefecture: null,
      scrollItems: [],
      showLocalSpecialty: false,

      showCategories: false,
      categories: ['カテゴリ1', 'カテゴリ2', 'カテゴリ3'],
      products: [
      { image: 'https://m3hjimotiesphoto.blob.core.windows.net/famousphoto/234.jpg', name: 'ラフテー', city: '沖縄県', price: '1500' },
      { image: 'https://m3hjimotiesphoto.blob.core.windows.net/famousphoto/100.jpg', name: 'ワイン', city: '長野県', price: '2500' },
      { image: 'https://m3hjimotiesphoto.blob.core.windows.net/famousphoto/161.jpg', name: 'マスカット', city: '岡山県', price: '3000' },
      { image: 'https://m3hjimotiesphoto.blob.core.windows.net/famousphoto/70.jpg', name: '箱根ビール', city: '神奈川県', price: '1300' },
      { image: 'https://m3hjimotiesphoto.blob.core.windows.net/famousphoto/34.jpg', name: '白菜', city: '福島県', price: '400' }] };


  },
  mounted() {
    //sessionStorage.setItem('user_ID', 1);
    // sessionStorageからuser_idを取得
    // セッションストレージからユーザーIDを取得
    const storedUserId = sessionStorage.getItem('user_ID');

    // ユーザーIDがセッションストレージに保存されていた場合
    if (storedUserId) {
      // 保存されていたユーザーIDを変数にセット
      this.userId = storedUserId;

      // データを取得するメソッドを呼び出す
      this.fetchUserIdAndPrefecture();
    } else {
      // ユーザーIDが保存されていない場合の処理（必要なら追加）
      console.log('保存なし');
    }
  },
  methods: {
    adminLogin() {
      // 管理者ログインのロジックをここに追加
      window.location.href = `EmployeeLogin.html`;
    },
    cardClicked(product) {
      console.log("商品引き渡し", product.name);
      // 商品名を取得
      const productName = encodeURIComponent(product.name); // URLエンコード
      console.log("商品引き渡し", productName);

      // 商品名をクエリパラメータとしてURLに追加して遷移
      window.location.href = `https://codepen.io/minakichi552/pen/ExBMzXr?productName=${productName}`;
    },
    itemClicked(item) {
      console.log("商品引き渡し", item.Item_name);
      // 商品名を取得
      const itemName = encodeURIComponent(item.Item_name); // URLエンコード
      console.log("商品引き渡し", itemName);

      // 商品名をクエリパラメータとしてURLに追加して遷移
      window.location.href = `https://codepen.io/minakichi552/pen/ExBMzXr?productName=${itemName}`;
    },

    async fetchUserIdAndPrefecture() {
      try {
        console.log("ユーザID:", this.userId);
        // API エンドポイントにリクエストを送信
        const response = await axios.post(`https://m3h-minaki-jimoties.azurewebsites.net/api/ExtractPrefectureByUserId?User_ID=${userIdAsNumber}`);

        console.log("都道府県取得", response.data);
        // レスポンスから都道府県を取得
        this.userPrefecture = response.data.replace(" ", ""); // " 東京都" から "東京都" に変換
        console.log("都道府県取得", this.userPrefecture);
        if (this.userPrefecture) {
          this.showLocalSpecialty = true; // 出身地が取得できたのでセクションを表示
          this.fetchScrollItems(this.userPrefecture);
        } else {
          this.showLocalSpecialty = false; // 出身地が取得できなかった場合
        }
      } catch (error) {
        console.error('Failed to fetch user prefecture:', error);
        this.showLocalSpecialty = false;
      }
    },

    async fetchScrollItems(prefecture) {
      try {
        // 都道府県に基づいてアイテム情報を取得
        const response = await axios.get('https://m3h-minaki-jimoties.azurewebsites.net/api/SearchItemPrefecture', {
          params: { Item_prefecture: prefecture } });


        console.log("商品情報取得", response.data);
        // レスポンスからアイテム情報を取得
        this.scrollItems = response.data.ItemTableList;
      } catch (error) {
        console.error('Failed to fetch items:', error);
        this.scrollItems = [];
      }
    },

    //ここからページ遷移先設定
    logout() {
      sessionStorage.removeItem('user_ID');
      window.location.href = `UserLogin.html`;
    },

    login() {
      window.location.href = `UserLogin.html`;
    },

    register() {
      window.location.href = `UserLogin.html`;
    },

    mypage() {
      window.location.href = `Mypage.html`;
    },

    favorite() {
      window.location.href = `Favorite.html`;
    },

    cart() {
      window.location.href = `Shoplist.html`;
    },

    searchkey() {
      window.location.href = `SearchKey.html`;
    },

    category() {
      window.location.href = `SearchCategory.html
`;
    },

    prefecture() {
      window.location.href = `SearchPrefecture.html


`;
    } } });