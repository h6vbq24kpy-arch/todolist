 //要素の呼び出し
    const input = document.getElementById("taskInput");
    const addBtn = document.getElementById("addBtn");
    const list = document.getElementById("taskList");

    // 保存されたタスクを読み込み（一番下のスクリプトで保存している）
    const saved = JSON.parse(localStorage.getItem("tasks") || "[]");
    // forEachでsavedに保存されているテキストをひとつずつaddTaskに渡す
    saved.forEach(addTask);

    addBtn.addEventListener("click", () => {
      if (!input.value.trim()) return;
      addTask(input.value);
      saveTasks();
      input.value = "";
    });

    // text には addTask を呼び出した側が渡した文字列が入る 
    // saved.forEach(addTask) のとき → saved の各要素 
    // addTask(input.value) のとき → ユーザーが入力した文字
    function addTask(text) {
      const li = document.createElement("li");

    //表示用のspan
    const span = document.createElement("span");
    span.textContent = text;

    //編集用のinput(最初は非表示)
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = text;
    editInput.style.display = "none";

    //編集開始(spanをクリック)
    span.addEventListener('click', () => {
      span.style.display = "none";
      editInput.style.display = "inline-block";
      editInput.focus();
    });

    //編集した内容を保存
    editInput.addEventListener("blur", () => {
      span.textContent = editInput.value;
      editInput.style.display = "none";
      span.style.display = "inline";
      saveTasks();
    });


    // 削除ボタンの作成
      const del = document.createElement("button");
      del.textContent = "削除";
      del.onclick = () => {
        if (window.confirm('このタスクを削除しますか？')) {
          li.remove(); //「はい」を選択した場合
        } saveTasks();
    };

    //HTML上に表示する
      li.appendChild(span);
      li.appendChild(editInput);
      li.appendChild(del);
      list.appendChild(li);
    }

    //追加されたタスクをページを閉じても消えないように保存する
    //list.children(liの集まり)を配列に変換し
    //各liの最初のテキスト（タスク名）だけを取り出して配列にする
    function saveTasks() {
      const tasks = [...list.children].map(li => {
        const span = li.querySelector("span");
        const input = li.querySelector("input");

        if (input.style.display !== "none") {
          return input.value;
        } else {
          return span.textContent;
        };
      });
    
      localStorage.setItem("tasks", JSON.stringify(tasks));
    };