// Spotify APIのクライアント情報
const clientId = "d81945988b1346e99ca447056dda2ef5";
const clientSecret = "37397ef2c382465fa123e5dcc87981d7";

// アクセストークンを取得
async function getAccessToken() {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
    },
    body: "grant_type=client_credentials",
  });

  const data = await response.json();
  return data.access_token;
}

// Imagine Dragonsの全楽曲を取得
async function getImagineDragonsAllTracks(accessToken) {
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=Imagine+Dragons&type=track&market=US&limit=50`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const data = await response.json();
  return data.tracks.items;
}

// ランキングを表示
async function displayRanking() {
  try {
    const accessToken = await getAccessToken();
    const tracks = await getImagineDragonsAllTracks(accessToken);

    const rankingList = document.getElementById("ranking");
    rankingList.innerHTML = ""; // リストをクリア

    tracks.forEach((track, index) => {
      const listItem = document.createElement("li");

      // ジャケット画像をリンクとして表示
      const albumLink = document.createElement("a");
      albumLink.href = track.external_urls.spotify;
      albumLink.target = "_blank"; // 新しいタブで開く

      const albumImage = document.createElement("img");
      albumImage.src = track.album.images[0]?.url || ""; // 画像が存在しない場合の安全策

      albumLink.appendChild(albumImage);

      // 楽曲名と人気度
      const trackInfo = document.createElement("span");
      trackInfo.textContent = `${index + 1}. ${track.name} (${track.popularity} pts)`;

      listItem.appendChild(albumLink); // ジャケットリンクをリストアイテムに追加
      listItem.appendChild(trackInfo); // テキスト情報を追加

      rankingList.appendChild(listItem); // リストアイテムをランキングに追加
    });
  } catch (error) {
    console.error("エラーが発生しました:", error);
    document.getElementById("ranking").textContent = "データを取得できませんでした。";
  }
}

// 初期化
displayRanking();

