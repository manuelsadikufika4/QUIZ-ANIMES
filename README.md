# Quiz Animes (APK)

## Gerar o APK
**Opção A – sem instalar nada:** suba esta pasta para o GitHub → aba *Actions* → *Build APK* → *Run workflow* → baixe `quiz-animes-apk`.

**Opção B – local (Node 18+, Android Studio):**
```
npm install
npx cap add android
npx cap sync android
npx cap open android   # Build > Build APK(s)
```
Sempre que mudar a pasta `www/`, rode `npx cap sync android`.

## Adicionar conteúdo
Edite `www/questions-extra.js`. Tipos: `quote` (frase), `opening`, `ending` (áudio), `gif`.
Coloque seus arquivos em `www/media/` (mp3/gif). Use apenas mídia que você tem direito de usar.

## Voz
🔊 liga/desliga a leitura em voz alta · 🎤 responda dizendo "a", "b", "letra c" ou o nome da opção.