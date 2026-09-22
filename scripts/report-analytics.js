/**
 * Vercel Web Analytics Report Script
 * Usage: node scripts/report-analytics.js [days=1]
 */
const https = require('https');
const fs = require('fs');
const path = require('path');

// Load .env.local
let token = process.env.VERCEL_TOKEN;
let projectId = process.env.VERCEL_PROJECT_ID;

if (!token || !projectId) {
  const envPath = path.join(__dirname, '..', '.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let val = match[2] || '';
        if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
        if (key === 'VERCEL_TOKEN') token = val.trim();
        if (key === 'VERCEL_PROJECT_ID') projectId = val.trim();
      }
    });
  }
}

if (!token || !projectId) {
  console.error('Error: VERCEL_TOKEN or VERCEL_PROJECT_ID is missing in .env.local');
  process.exit(1);
}

const daysArg = Number(process.argv[2]) || 1;
const now = Date.now();
const since = now - daysArg * 24 * 60 * 60 * 1000;

function fetchApi(apiPath) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.vercel.com',
      path: apiPath,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    };
    const req = https.request(options, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

async function runReport() {
  try {
    const [countData, pathData, refData, deviceData] = await Promise.all([
      fetchApi(`/v1/query/web-analytics/visits/count?projectId=${projectId}`),
      fetchApi(`/v1/query/web-analytics/visits/aggregate?projectId=${projectId}&by=requestPath&since=${since}&until=${now}&limit=8`),
      fetchApi(`/v1/query/web-analytics/visits/aggregate?projectId=${projectId}&by=referrerHostname&since=${since}&until=${now}&limit=5`),
      fetchApi(`/v1/query/web-analytics/visits/aggregate?projectId=${projectId}&by=deviceType&since=${since}&until=${now}`),
    ]);

    const visitors = countData.data?.visitors ?? 0;
    const pageviews = countData.data?.pageviews ?? 0;

    console.log(`\n📊 [삼촌생각 실시간 웹 분석 리포트 (최근 ${daysArg}일간)]`);
    console.log(`-----------------------------------------------`);
    console.log(`👥 총 방문자 수: ${visitors}명`);
    console.log(`📄 총 페이지뷰: ${pageviews}회`);
    console.log(`-----------------------------------------------`);

    console.log(`\n🔥 가장 많이 본 인기 페이지 TOP:`);
    if (pathData.data && pathData.data.length > 0) {
      pathData.data.forEach((item, idx) => {
        const pageName = item.requestPath === '/' ? '메인 홈 (/) ' : item.requestPath;
        console.log(`  ${idx + 1}. ${pageName.padEnd(25)} : 방문자 ${item.visitors}명 (${item.pageviews}회 조회)`);
      });
    } else {
      console.log('  (아직 조회 기록이 없습니다)');
    }

    console.log(`\n🧭 방문 유입 경로 (Referrer):`);
    if (refData.data && refData.data.length > 0) {
      refData.data.forEach((item) => {
        const source = item.referrerHostname === '' ? '직접 접속 / 북마크 / 카카오톡' : item.referrerHostname;
        console.log(`  • ${source.padEnd(30)} : ${item.visitors}명 (${item.pageviews}회)`);
      });
    }

    console.log(`\n📱 접속 기기 환경:`);
    if (deviceData.data && deviceData.data.length > 0) {
      deviceData.data.forEach((item) => {
        const devName = item.deviceType === 'mobile' ? '모바일(스마트폰)' : '데스크톱(PC)';
        console.log(`  • ${devName.padEnd(16)} : ${item.visitors}명 (${item.pageviews}회)`);
      });
    }
    console.log(`-----------------------------------------------\n`);

  } catch (err) {
    console.error('API 조회 실패:', err.message);
  }
}

runReport();
