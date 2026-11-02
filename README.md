<div align="center">

<img src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/controller.svg" width="64" alt="Quiz Animes">

# Quiz Animes

**Quiz de animes com frases, openings, endings e GIFs, agora com voz!**

![Android](https://img.shields.io/badge/Android-APK-3DDC84?style=for-the-badge&logo=android&logoColor=white)
![Capacitor](https://img.shields.io/badge/Capacitor-119EFF?style=for-the-badge&logo=capacitor&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![Node](https://img.shields.io/badge/Node-18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/CI-GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)
![License](https://img.shields.io/badge/Uso-Mídia_própria-orange?style=for-the-badge)

</div>

---

## <img src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/stars.svg" width="22"> Recursos

| | Recurso | Descrição |
|---|---|---|
| <img src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/chat-quote.svg" width="18"> | **Quote** | Adivinhe o anime pela frase |
| <img src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/music-note-beamed.svg" width="18"> | **Opening / Ending** | Questões com áudio |
| <img src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/film.svg" width="18"> | **GIF** | Reconheça a cena animada |
| <img src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/mic.svg" width="18"> | **Voz** | Leitura em voz alta e resposta por comando de voz |

---

## <img src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/android2.svg" width="22"> Gerar o APK

### <img src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/cloud-arrow-down.svg" width="18"> Opção A: sem instalar nada

1. Suba esta pasta para o GitHub
2. Abra a aba **Actions** → **Build APK** → **Run workflow**
3. Baixe o artefato `quiz-animes-apk`

### <img src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/terminal.svg" width="18"> Opção B: local

> **Requisitos:** Node 18+ e Android Studio

```bash
npm install
npx cap add android
npx cap sync android
npx cap open android   # Build > Build APK(s)
```

> [!TIP]
> Sempre que alterar a pasta `www/`, rode `npx cap sync android`.

---

## <img src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/plus-circle.svg" width="22"> Adicionar conteúdo

Edite `www/questions-extra.js` e coloque seus arquivos em `www/media/`.

| Tipo | Uso | Formato |
|---|---|---|
| `quote` | Frase | texto |
| `opening` | Abertura | mp3 |
| `ending` | Encerramento | mp3 |
| `gif` | Cena | gif |

> [!WARNING]
> Use apenas mídia que você tem direito de usar.

---

## <img src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/volume-up.svg" width="22"> Voz

| Botão | Função |
|---|---|
| 🔊 | Liga/desliga a leitura em voz alta |
| 🎤 | Responda dizendo `a`, `b`, `letra c` ou o nome da opção |