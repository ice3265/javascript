// 初期値を定義
let count = 10;
let timer = null;

// HTML要素を取得
const countdownElement = document.getElementById("countdown");
const restartButton = document.getElementById("restartButton");

// カウントダウンを実行する関数
function startCountdown() {
  countdownElement.textContent = count; // 初期値を表示
  restartButton.style.display = "none"; // ボタンを非表示

  timer = setInterval(() => {
    count--;
    countdownElement.textContent = count; // カウントを更新

    // カウントが終了した場合
    if (count < 0) {
      clearInterval(timer);
      countdownElement.textContent = "終了！"; // 終了メッセージ
      restartButton.style.display = "inline"; // ボタンを表示
    }
  }, 1000);
}

// ボタンがクリックされたときにカウントダウンを再開
restartButton.addEventListener("click", () => {
  count = 10; // カウントをリセット
  startCountdown(); // 再度カウントダウンを開始
});

// 初回カウントダウンを開始
startCountdown();
