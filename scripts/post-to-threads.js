/**
 * Threads(스레드) 자동 포스팅 스크립트
 * 
 * 사용법:
 * node scripts/post-to-threads.js --text "게시글 내용" --url "https://unclenote.com/..."
 */

const fs = require('fs');
const path = require('path');

// .env.local 파일에서 환경변수 로드
function loadEnv() {
  const envPath = path.resolve(__dirname, '../.env.local');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let val = match[2] || '';
        val = val.replace(/(^['"]|['"]$)/g, '').trim();
        process.env[key] = val;
      }
    }
  }
}

loadEnv();

async function publishToThreads() {
  const userId = process.env.THREADS_USER_ID;
  const accessToken = process.env.THREADS_ACCESS_TOKEN;

  if (!userId || !accessToken) {
    console.error('❌ [오류] .env.local 파일에 THREADS_USER_ID와 THREADS_ACCESS_TOKEN이 필요합니다.');
    console.log('👉 가이드: Meta for Developers에서 Threads 계정 연동 후 토큰을 발급받아 등록하세요.');
    process.exit(1);
  }

  // CLI 인자 파싱
  const args = process.argv.slice(2);
  let text = '';
  let linkAttachment = '';

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--text' && args[i + 1]) {
      text = args[i + 1];
      i++;
    } else if (args[i] === '--url' && args[i + 1]) {
      linkAttachment = args[i + 1];
      i++;
    }
  }

  if (!text) {
    console.error('❌ 포스팅할 텍스트(--text)를 입력해주세요.');
    process.exit(1);
  }

  const fullText = linkAttachment ? `${text}\n\n👉 바로가기: ${linkAttachment}` : text;

  try {
    console.log('🚀 [1단계] Threads 미디어 컨테이너 생성 중...');
    
    // 1단계: 미디어 컨테이너 생성
    const createRes = await fetch(`https://graph.threads.net/v1.0/${userId}/threads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        media_type: 'TEXT',
        text: fullText,
        access_token: accessToken,
      }),
    });

    const createData = await createRes.json();
    if (!createRes.ok || !createData.id) {
      throw new Error(`컨테이너 생성 실패: ${JSON.stringify(createData)}`);
    }

    const creationId = createData.id;
    console.log(`✅ 컨테이너 생성 완료 (ID: ${creationId})`);

    // 2단계: 실제 배포(Publish)
    console.log('📢 [2단계] Threads에 최종 발행(Publish) 중...');
    const publishRes = await fetch(`https://graph.threads.net/v1.0/${userId}/threads_publish`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        creation_id: creationId,
        access_token: accessToken,
      }),
    });

    const publishData = await publishRes.json();
    if (!publishRes.ok || !publishData.id) {
      throw new Error(`발행 실패: ${JSON.stringify(publishData)}`);
    }

    console.log(`🎉 [발행 성공!] Threads에 포스팅이 완료되었습니다! (Post ID: ${publishData.id})`);
  } catch (err) {
    console.error('❌ 포스팅 중 오류 발생:', err.message);
    process.exit(1);
  }
}

publishToThreads();
