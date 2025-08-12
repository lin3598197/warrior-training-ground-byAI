(() => {
  // 語言系統
  const translations = {
    'zh-TW': {
      title: '戰士訓練場',
      currency: '金幣',
      reset: '重置',
      shop: '武器店',
      shop_title: '⚔️ 武器商店',
      weapons_category: '🗡️ 武器',
      magic_category: '🧙 魔法道具',
      mercenary_category: '🏰 傭兵',
      owned: '擁有',
      iron_sword: '鐵劍 (50)',
      iron_sword_desc: '攻擊力 +5',
      steel_sword: '鋼劍 (300)',
      steel_sword_desc: '攻擊力 +25',
      magic_sword: '魔法劍 (1500)',
      magic_sword_desc: '攻擊力 +100',
      legendary_sword: '傳奇神劍 (8000)',
      legendary_sword_desc: '攻擊力 +400',
      cosmic_blade: '宇宙之刃 (40000)',
      cosmic_blade_desc: '攻擊力 +1500',
      reality_cutter: '現實切割者 (200000)',
      reality_cutter_desc: '攻擊力 +6000',
      mana_crystal: '魔力水晶 (1000)',
      mana_crystal_desc: '魔力 +50',
      archer: '弓箭手 (500)',
      archer_desc: '每秒攻擊 +10',
      knight: '騎士 (3000)',
      knight_desc: '每秒攻擊 +60',
      dragon: '巨龍 (15000)',
      dragon_desc: '每秒攻擊 +400',
      archangel: '大天使 (75000)',
      archangel_desc: '每秒攻擊 +1500',
      titan_guardian: '泰坦守護者 (400000)',
      titan_guardian_desc: '每秒攻擊 +6000',
      cosmic_warrior: '宇宙戰士 (2000000)',
      cosmic_warrior_desc: '每秒攻擊 +25000',
      defeat_reward: '擊敗獲得',
      coins_reward: '金幣',
      reset_confirm: '確定要重置所有進度嗎？這將清除所有金幣和購買的物品！',
      monsters: {
        slime: '史萊姆',
        goblin: '哥布林',
        orc: '獸人戰士',
        skeleton: '骷髏兵',
        troll: '巨魔',
        dragon: '紅龍',
        ancient_dragon: '遠古巨龍',
        demon_lord: '魔王',
        phoenix: '不死鳥',
        kraken: '深海巨妖',
        lich_king: '巫妖王',
        void_lord: '虛空領主',
        cosmic_titan: '宇宙泰坦',
        reality_breaker: '現實破壞者'
      }
    },
    'en': {
      title: 'Warrior Training Ground',
      currency: 'Gold',
      reset: 'Reset',
      shop: 'Weapon Shop',
      shop_title: '⚔️ Weapon Shop',
      weapons_category: '🗡️ Weapons',
      magic_category: '🧙 Magic Items',
      mercenary_category: '🏰 Mercenaries',
      owned: 'Owned',
      iron_sword: 'Iron Sword (50)',
      iron_sword_desc: 'Attack +5',
      steel_sword: 'Steel Sword (300)',
      steel_sword_desc: 'Attack +25',
      magic_sword: 'Magic Sword (1500)',
      magic_sword_desc: 'Attack +100',
      legendary_sword: 'Legendary Sword (8000)',
      legendary_sword_desc: 'Attack +400',
      cosmic_blade: 'Cosmic Blade (40000)',
      cosmic_blade_desc: 'Attack +1500',
      reality_cutter: 'Reality Cutter (200000)',
      reality_cutter_desc: 'Attack +6000',
      mana_crystal: 'Mana Crystal (1000)',
      mana_crystal_desc: 'Mana +50',
      archer: 'Archer (500)',
      archer_desc: 'DPS +10',
      knight: 'Knight (3000)',
      knight_desc: 'DPS +60',
      dragon: 'Dragon (15000)',
      dragon_desc: 'DPS +400',
      archangel: 'Archangel (75000)',
      archangel_desc: 'DPS +1500',
      titan_guardian: 'Titan Guardian (400000)',
      titan_guardian_desc: 'DPS +6000',
      cosmic_warrior: 'Cosmic Warrior (2000000)',
      cosmic_warrior_desc: 'DPS +25000',
      defeat_reward: 'Defeat reward',
      coins_reward: 'Gold',
      reset_confirm: 'Are you sure you want to reset all progress? This will clear all gold and purchased items!',
      monsters: {
        slime: 'Slime',
        goblin: 'Goblin',
        orc: 'Orc Warrior',
        skeleton: 'Skeleton',
        troll: 'Troll',
        dragon: 'Red Dragon',
        ancient_dragon: 'Ancient Dragon',
        demon_lord: 'Demon Lord',
        phoenix: 'Phoenix',
        kraken: 'Kraken',
        lich_king: 'Lich King',
        void_lord: 'Void Lord',
        cosmic_titan: 'Cosmic Titan',
        reality_breaker: 'Reality Breaker'
      }
    }
  };

  let currentLang = localStorage.getItem('game:language') || 'zh-TW';

  // 翻譯函數
  function t(key) {
    const keys = key.split('.');
    let value = translations[currentLang];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  }

  // 更新界面語言
  function updateLanguage() {
    // 更新所有有 data-i18n 屬性的元素
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (key === 'owned') {
        // 特殊處理 "擁有" 文字
        const ownedKey = el.getAttribute('data-owned-for');
        const count = owned[ownedKey] || 0;
        el.textContent = `${t('owned')} ${count}`;
      } else {
        el.textContent = t(key);
      }
    });

    // 更新語言切換按鈕
    const langButton = document.getElementById('langToggle');
    if (langButton) {
      langButton.textContent = currentLang === 'zh-TW' ? '🌐 中文' : '🌐 English';
    }

    // 更新怪物名稱和獎勵預覽，但不重新設定血量
    if (currentMonster) {
      monsterNameEl.textContent = t(`monsters.${currentMonster.key}`);
      const [min, max] = currentMonster.reward;
      rewardPreview.textContent = `${t('defeat_reward')}: ${min}-${max} ${t('coins_reward')}`;
    }
  }

  // 切換語言
  function toggleLanguage() {
    currentLang = currentLang === 'zh-TW' ? 'en' : 'zh-TW';
    localStorage.setItem('game:language', currentLang);
    updateLanguage();
  }

  const btn = document.getElementById('countButton');
  const resetBtn = document.getElementById('resetButton');
  const moneyEl = document.getElementById('moneyValue');
  const hud = document.getElementById('moneyHud');
  const KEY = 'counter:value:v1';
  const shopButtons = () => Array.from(document.querySelectorAll('.buy-item'));
  const ownedBadges = key => document.querySelector(`[data-owned-for="${key}"]`);
  const RATE_KEY = 'counter:presses:v1';
  const COIN_KEY = 'counter:coins:v1';
  const OWNED_KEY = 'counter:owned:v1';
  const AUTO_INTERVAL_KEY = 'counter:auto:start:v1';
  const shopToggle = document.getElementById('shopToggle');
  const shopPanel = document.getElementById('shopPanel');
  const container = document.querySelector('.container');
  const monsterNameEl = document.getElementById('monsterName');
  const monsterHpEl = document.getElementById('monsterHp');
  const monsterHpBar = document.getElementById('monsterHpBar');
  const monsterSprite = document.getElementById('monsterSprite');
  const rewardPreview = document.getElementById('rewardPreview');
  const rewardNotification = document.getElementById('rewardNotification');
  const rewardText = document.getElementById('rewardText');

  // 記住初始置中的 transform 值
  let centeredTransform = 'translateX(0)';

  // 怪物資料 - 按順序出現，大幅增加血量
  const monsters = {
    slime: { key: 'slime', hp: 5000, maxHp: 5000, sprite: '🟢', reward: [10, 20] },
    goblin: { key: 'goblin', hp: 15000, maxHp: 15000, sprite: '👺', reward: [25, 40] },
    orc: { key: 'orc', hp: 40000, maxHp: 40000, sprite: '👹', reward: [60, 100] },
    skeleton: { key: 'skeleton', hp: 100000, maxHp: 100000, sprite: '💀', reward: [150, 250] },
    troll: { key: 'troll', hp: 250000, maxHp: 250000, sprite: '👻', reward: [400, 600] },
    dragon: { key: 'dragon', hp: 600000, maxHp: 600000, sprite: '🐉', reward: [1000, 1500] },
    ancient_dragon: { key: 'ancient_dragon', hp: 1500000, maxHp: 1500000, sprite: '🐲', reward: [2500, 4000] },
    demon_lord: { key: 'demon_lord', hp: 3500000, maxHp: 3500000, sprite: '👿', reward: [6000, 10000] },
    phoenix: { key: 'phoenix', hp: 6000000, maxHp: 6000000, sprite: '🔥', reward: [10000, 15000] },
    kraken: { key: 'kraken', hp: 12000000, maxHp: 12000000, sprite: '🐙', reward: [20000, 30000] },
    lich_king: { key: 'lich_king', hp: 25000000, maxHp: 25000000, sprite: '☠️', reward: [40000, 60000] },
    void_lord: { key: 'void_lord', hp: 50000000, maxHp: 50000000, sprite: '🌑', reward: [80000, 120000] },
    cosmic_titan: { key: 'cosmic_titan', hp: 100000000, maxHp: 100000000, sprite: '⭐', reward: [150000, 250000] },
    reality_breaker: { key: 'reality_breaker', hp: 2147483647, maxHp: 2147483647, sprite: '💥', reward: [400000, 600000] }
  };

  // 怪物出現順序
  const monsterOrder = [
    'slime', 'goblin', 'orc', 'skeleton', 'troll', 'dragon',
    'ancient_dragon', 'demon_lord', 'phoenix', 'kraken', 
    'lich_king', 'void_lord', 'cosmic_titan', 'reality_breaker'
  ];

  let currentMonsterIndex = loadJSON('monster:index:v1', 0);
  let currentMonster = { ...monsters[monsterOrder[currentMonsterIndex]] };

  function loadJSON(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch { return fallback; }
  }
  function saveJSON(key, val) { localStorage.setItem(key, JSON.stringify(val)); }

  // 既有 value -> 按下次數，同時作為金幣
  let value = loadJSON(RATE_KEY, 0);
  // 移除獨立的 coins 變數，直接使用 value
  // 已購買物品資料
  let owned = loadJSON(OWNED_KEY, {});
  // 攻擊力計算 - 移除防具加成
  function clickGain() {
    let attack = 1; // 基礎攻擊力
    
    // 武器加成
    attack += (owned.iron_sword || 0) * 5;
    attack += (owned.steel_sword || 0) * 25;
    attack += (owned.magic_sword || 0) * 100;
    attack += (owned.legendary_sword || 0) * 400;
    attack += (owned.cosmic_blade || 0) * 1500;
    attack += (owned.reality_cutter || 0) * 6000;
    
    // 魔力加成
    const mana = (owned.mana_crystal || 0) * 50;
    attack += Math.floor(mana * 0.2);
    
    return Math.max(1, Math.floor(attack));
  }

  function updateOwnedUI() {
    for (const k in owned) {
      const badge = ownedBadges(k);
      if (badge) badge.textContent = `${t('owned')} ${owned[k]}`;
    }
  }

  function updateMoney() {
    moneyEl.textContent = value; // 金幣 = 點擊次數
    // 更新可購買狀態
    shopButtons().forEach(btn => {
      const cost = Number(btn.dataset.cost);
      btn.disabled = value < cost; // 使用 value 而非 coins
    });
  }

  updateMoney();
  updateOwnedUI();

  // 生成下一隻怪物
  function spawnNewMonster() {
    // 前進到下一隻怪物
    currentMonsterIndex = (currentMonsterIndex + 1) % monsterOrder.length;
    saveJSON('monster:index:v1', currentMonsterIndex);
    
    const monsterKey = monsterOrder[currentMonsterIndex];
    currentMonster = { ...monsters[monsterKey] };
    updateMonsterDisplay();
  }

  // 更新怪物顯示
  function updateMonsterDisplay() {
    monsterNameEl.textContent = t(`monsters.${currentMonster.key}`);
    monsterHpEl.textContent = `${currentMonster.hp}/${currentMonster.maxHp}`;
    monsterSprite.textContent = currentMonster.sprite;
    
    const hpPercent = (currentMonster.hp / currentMonster.maxHp) * 100;
    monsterHpBar.style.width = `${hpPercent}%`;
    
    const [min, max] = currentMonster.reward;
    rewardPreview.textContent = `${t('defeat_reward')}: ${min}-${max} ${t('coins_reward')}`;
  }

  // 顯示獎勵通知
  function showReward(amount) {
    rewardText.textContent = `+${amount} ${t('coins_reward')}!`;
    rewardNotification.style.display = 'block';
    setTimeout(() => {
      rewardNotification.style.display = 'none';
    }, 1000);
  }

  // 攻擊怪物
  function attackMonster() {
    const damage = clickGain();
    currentMonster.hp = Math.max(0, currentMonster.hp - damage);
    
    if (currentMonster.hp <= 0) {
      // 怪物死亡，給予獎勵
      const [min, max] = currentMonster.reward;
      const reward = Math.floor(Math.random() * (max - min + 1)) + min;
      value += reward;
      saveJSON(RATE_KEY, value);
      updateMoney();
      showReward(reward);
      
      // 生成新怪物
      setTimeout(() => spawnNewMonster(), 500);
    }
    
    updateMonsterDisplay();
    return currentMonster.hp <= 0;
  }

  btn.addEventListener('click', () => {
    const monsterKilled = attackMonster();
    
    // 點擊也獲得金幣
    const clickReward = clickGain(); // 使用攻擊力作為點擊獎勵
    value += clickReward;
    saveJSON(RATE_KEY, value);
    updateMoney();
  });

  // 購買邏輯
  document.addEventListener('click', e => {
    const target = e.target;
    if (!(target instanceof HTMLElement)) return;
    if (!target.classList.contains('buy-item')) return;
    const cost = Number(target.dataset.cost);
    const key = target.dataset.key;
    if (value < cost) return; // 使用 value 檢查
    value -= cost; // 從 value 扣除
    owned[key] = (owned[key] || 0) + 1;
    saveJSON(RATE_KEY, value); // 儲存更新後的 value
    saveJSON(OWNED_KEY, owned);
    updateMoney();
    updateOwnedUI();
    ensureAutoIncrement();
  });

  // 自動戰鬥系統 - 調整傭兵攻擊力
  let autoTimer = null;
  function ensureAutoIncrement() {
    const mercenaryDPS = (owned.archer || 0) * 10 + 
                        (owned.knight || 0) * 60 + 
                        (owned.dragon || 0) * 400 +
                        (owned.archangel || 0) * 1500 +
                        (owned.titan_guardian || 0) * 6000 +
                        (owned.cosmic_warrior || 0) * 25000;
    
    console.log(`檢查自動攻擊：傭兵DPS=${mercenaryDPS}`);
    
    if (mercenaryDPS <= 0) {
      console.log('沒有傭兵，停止自動攻擊');
      if (autoTimer) {
        clearInterval(autoTimer);
        autoTimer = null;
      }
      return;
    }
    
    if (autoTimer) {
      console.log('自動攻擊已經在運行中');
      return;
    }
    
    console.log('啟動自動攻擊系統！');
    
    autoTimer = setInterval(() => {
      // 重新計算 DPS，因為可能在執行期間購買了新傭兵
      const currentMercenaryDPS = (owned.archer || 0) * 10 + 
                                 (owned.knight || 0) * 60 + 
                                 (owned.dragon || 0) * 400 +
                                 (owned.archangel || 0) * 1500 +
                                 (owned.titan_guardian || 0) * 6000 +
                                 (owned.cosmic_warrior || 0) * 25000;
      
      // 傭兵自動攻擊怪物
      if (currentMercenaryDPS > 0) {
        console.log(`傭兵攻擊！DPS: ${currentMercenaryDPS}, 怪物HP: ${currentMonster.hp}/${currentMonster.maxHp}`);
        currentMonster.hp = Math.max(0, currentMonster.hp - currentMercenaryDPS);
        
        if (currentMonster.hp <= 0) {
          // 怪物死亡，給予獎勵
          const [min, max] = currentMonster.reward;
          const reward = Math.floor(Math.random() * (max - min + 1)) + min;
          console.log(`${t(`monsters.${currentMonster.key}`)} 被擊敗！獲得 ${reward} 金幣`);
          value += reward;
          saveJSON(RATE_KEY, value);
          updateMoney();
          
          // 生成新怪物
          spawnNewMonster();
        } else {
          updateMonsterDisplay();
        }
      }
    }, 1000);
  }

  // 快捷鍵維持
  // Keyboard shortcut (space / enter)
  document.addEventListener('keydown', e => {
    if (['Space','Enter'].includes(e.code)) {
      e.preventDefault();
      btn.click();
    }
    if (e.code === 'KeyR' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      resetBtn.click();
    }
  });

  // 初始化：若存在商店面板則先 hidden -> 透過 class 控制 visibility
  if (shopPanel) {
    shopPanel.hidden = false;
  }

  // 移除舊版 safeTranslate / layout* 實作，改為穩定公式
  // 公式：container 在關閉商店時於畫面置中；開啟商店時希望左邊距為 24px
  function layoutCenter() {
    document.body.classList.remove('store-open');
    // 重新計算置中位置並記住
    container.style.transform = 'translateX(0)';
    requestAnimationFrame(() => {
      const width = container.offsetWidth;
      const centerX = (window.innerWidth - width) / 2;
      const currentLeft = container.getBoundingClientRect().left;
      const shift = centerX - currentLeft;
      centeredTransform = `translateX(${Math.round(shift)}px)`;
      container.style.transform = centeredTransform;
    });
  }

  function layoutStoreOpen() {
    document.body.classList.add('store-open');
    // 從記住的置中位置開始，左移 300px (增加移動幅度)
    const currentShift = centeredTransform.match(/-?\d+/)?.[0] || '0';
    const newShift = parseInt(currentShift) - 500;
    container.style.transform = `translateX(${newShift}px)`;
  }

  // 初始置中
  layoutCenter();

  // 視窗縮放重新計算
  window.addEventListener('resize', () => {
    if (document.body.classList.contains('store-open')) layoutStoreOpen();
    else layoutCenter();
  });

  // 商店開關
  if (shopToggle) {
    shopToggle.addEventListener('click', () => {
      const opening = !document.body.classList.contains('store-open');
      if (opening) layoutStoreOpen(); 
      else {
        // 關閉商店時回到記住的置中位置
        container.style.transform = centeredTransform;
        document.body.classList.remove('store-open');
      }
      shopToggle.setAttribute('aria-pressed', opening ? 'true' : 'false');
    });
  }

  // 重置功能加入確認對話框
  resetBtn.addEventListener('click', () => {
    const confirmed = confirm(t('reset_confirm'));
    if (!confirmed) return;
    
    // 清空所有數據
    value = 0;
    owned = {};
    currentMonsterIndex = 0;
    
    // 清除 localStorage
    localStorage.removeItem(RATE_KEY);
    localStorage.removeItem(OWNED_KEY);
    localStorage.removeItem(COIN_KEY);
    localStorage.removeItem('monster:index:v1');
    
    // 停止自動增長
    if (autoTimer) {
      clearInterval(autoTimer);
      autoTimer = null;
    }
    
    // 重置到第一隻怪物
    currentMonster = { ...monsters[monsterOrder[0]] };
    
    // 更新 UI
    updateMoney();
    updateOwnedUI();
    updateMonsterDisplay();
  });

  // 初始化怪物顯示
  updateMonsterDisplay();

  // 語言切換按鈕事件
  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', toggleLanguage);
  }

  // 初始化語言
  updateLanguage();
})();
