/**
 * Instagram Graph API 자동 포스팅 스크립트
 * 
 * 사용법:
 * node scripts/post-to-instagram.js --image "https://unclenote.com/images/..." --caption "인스타그램 게시글 본문..."
 */

const fs = require('fs');
const path = require('path');

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

async function publishToInstagram() {
  const igUserId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN || process.env.THREADS_ACCESS_TOKEN;

  if (!igUserId || !accessToken) {
    console.error('❌ [오류] .env.local에 INSTAGRAM_BUSINESS_ACCOUNT_ID와 ACCESS_TOKEN이 필요합니다.');
    console.log('👉 가이드: Facebook 페이지에 연결된 Instagram 비즈니스 계정 ID를 등록하세요.');
    process.exit(1);
  }

  const args = process.argv.slice(2);
  let imageUrl = '';
  let caption = '';

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--image' && args[i + 1]) {
      imageUrl = args[i + 1];
      i++;
    } else if (args[i] === '--caption' && args[i + 1]) {
      caption = args[i + 1];
      i++;
    }
  }

  if (!imageUrl) {
    console.error('❌ Instagram은 이미지가 필수입니다. (--image "https://공개이미지주소.jpg")');
    process.exit(1);
  }

  try {
    console.log('📸 [1단계] Instagram 미디어 컨테이너 생성 중...');
    const containerRes = await fetch(`https://graph.facebook.com/v21.0/${igUserId}/media`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        image_url: imageUrl,
        caption: caption || '',
        access_token: accessToken,
      }),
    });

    const containerData = await containerRes.json();
    if (!containerRes.ok || !containerData.id) {
      throw new Error(`컨테이너 생성 실패: ${JSON.stringify(containerData)}`);
    }

    const creationId = containerData.id;
    console.log(`✅ Instagram 컨테이너 생성 완료 (ID: ${creationId})`);

    // 상태 확인 (READY 상태 대기)
    console.log('⏳ 미디어 처리 대기 중 (3초)...');
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // 2단계: 실제 발행
    console.log('🚀 [2단계] Instagram 피드 최종 발행 중...');
    const publishRes = await fetch(`https://graph.facebook.com/v21.0/${igUserId}/media_publish`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        creation_id: creationId,
        access_token: accessToken,
      }),
    });

    const publishData = await publishRes.json();
    if (!publishRes.ok || !publishData.id) {
      throw new Error(`Instagram 발행 실패: ${JSON.stringify(publishData)}`);
    }

    console.log(`🎉 [발행 성공!] Instagram에 포스팅이 완료되었습니다! (Post ID: ${publishData.id})`);
  } catch (err) {
    console.error('❌ 포스팅 중 오류 발생:', err.message);
    process.exit(1);
  }
}

publishToInstagram();
