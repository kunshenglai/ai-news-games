// ============================================================
// PixiJS Particle 预设库 (基于 @pixi/particle v3)
// 来源: pixi-particles 官方配置格式
// 用法: emitPreset(emitterContainer, x, y, presetName)
// ============================================================

var PARTICLE_PRESETS = {

  // === 爆炸类 ===

  "explosion_fireball": {
    // 经典火球爆炸 — 红色/橙色/黄色多阶段颜色，快速膨胀
    lifetime: { min: 0.3, max: 0.6 },
    frequency: 0.001,
    emitterLifetime: 0.15,
    maxParticles: 200,
    pos: { x: 0, y: 0 },
    behaviors: [
      { type: "spawnShape", config: { type: "circle", data: { radius: 5 } } },
      { type: "color", config: { color: { list: [
        { value: 0xFFFFFF, time: 0 },
        { value: 0xFFAA33, time: 0.15 },
        { value: 0xFF4400, time: 0.5 },
        { value: 0x882200, time: 1 }
      ]} } },
      { type: "alpha", config: { alpha: { list: [
        { value: 1, time: 0 },
        { value: 0.8, time: 0.2 },
        { value: 0, time: 1 }
      ]} } },
      { type: "scale", config: { scale: { list: [
        { value: 0.1, time: 0 },
        { value: 1, time: 0.15 },
        { value: 0.5, time: 0.6 },
        { value: 0, time: 1 }
      ]}, minMult: 0.5 } },
      { type: "moveSpeed", config: { speed: { list: [
        { value: 200, time: 0 },
        { value: 100, time: 0.3 },
        { value: 20, time: 1 }
      ]}, minMult: 0.3 } },
      { type: "rotation", config: { accel: { list: [
        { value: 0, time: 0 },
        { value: 0, time: 1 }
      ]}, minMult: 0, maxMult: 6 } },
      { type: "randomDrift", config: { driftMin: 10, driftMax: 40 } }
    ]
  },

  "explosion_shockwave": {
    // 冲击波爆炸 — 快速向外扩散的环形波纹
    lifetime: { min: 0.2, max: 0.5 },
    frequency: 0.001,
    emitterLifetime: 0.2,
    maxParticles: 150,
    pos: { x: 0, y: 0 },
    behaviors: [
      { type: "spawnShape", config: { type: "circle", data: { radius: 3 } } },
      { type: "color", config: { color: { list: [
        { value: 0xFFDD88, time: 0 },
        { value: 0xFF8844, time: 0.4 },
        { value: 0x663300, time: 1 }
      ]} } },
      { type: "alpha", config: { alpha: { list: [
        { value: 1, time: 0 },
        { value: 0.6, time: 0.3 },
        { value: 0, time: 1 }
      ]} } },
      { type: "scale", config: { scale: { list: [
        { value: 0.3, time: 0 },
        { value: 1.2, time: 0.2 },
        { value: 0.8, time: 0.7 },
        { value: 0, time: 1 }
      ]}, minMult: 0.4 } },
      { type: "moveSpeed", config: { speed: { list: [
        { value: 300, time: 0 },
        { value: 150, time: 0.3 },
        { value: 30, time: 1 }
      ]}, minMult: 0.5 } },
      { type: "rotation", config: { accel: { list: [
        { value: 0, time: 0 },
        { value: 0, time: 1 }
      ]}, minMult: 0, maxMult: 4 } }
    ]
  },

  "explosion_debris": {
    // 碎片爆散 — 硬核军事风格，不规则碎片飞散
    lifetime: { min: 0.5, max: 1.2 },
    frequency: 0.001,
    emitterLifetime: 0.1,
    maxParticles: 80,
    pos: { x: 0, y: 0 },
    behaviors: [
      { type: "spawnShape", config: { type: "circle", data: { radius: 8 } } },
      { type: "color", config: { color: { list: [
        { value: 0xFF6633, time: 0 },
        { value: 0xCC4411, time: 0.3 },
        { value: 0x662200, time: 1 }
      ]} } },
      { type: "alpha", config: { alpha: { list: [
        { value: 1, time: 0 },
        { value: 1, time: 0.4 },
        { value: 0, time: 1 }
      ]} } },
      { type: "scale", config: { scale: { list: [
        { value: 0.8, time: 0 },
        { value: 1, time: 0.1 },
        { value: 0.6, time: 0.5 },
        { value: 0, time: 1 }
      ]}, minMult: 0.3 } },
      { type: "moveSpeed", config: { speed: { list: [
        { value: 250, time: 0 },
        { value: 100, time: 0.5 },
        { value: 10, time: 1 }
      ]}, minMult: 0.2 } },
      { type: "acceleration", config: { accel: { x: 0, y: 80 } } },
      { type: "rotation", config: { accel: { list: [
        { value: 180, time: 0 },
        { value: 60, time: 1 }
      ]}, minMult: 2, maxMult: 8 } },
      { type: "randomDrift", config: { driftMin: 5, driftMax: 20 } }
    ]
  },

  "explosion_nuke": {
    // 核爆蘑菇云 — 巨大火球 + 烟雾柱
    lifetime: { min: 0.8, max: 2.0 },
    frequency: 0.001,
    emitterLifetime: 0.3,
    maxParticles: 300,
    pos: { x: 0, y: 0 },
    behaviors: [
      { type: "spawnShape", config: { type: "circle", data: { radius: 5 } } },
      { type: "color", config: { color: { list: [
        { value: 0xFFFFEE, time: 0 },
        { value: 0xFFAA33, time: 0.1 },
        { value: 0xFF4400, time: 0.3 },
        { value: 0x664422, time: 0.6 },
        { value: 0x332211, time: 1 }
      ]} } },
      { type: "alpha", config: { alpha: { list: [
        { value: 1, time: 0 },
        { value: 0.7, time: 0.3 },
        { value: 0, time: 1 }
      ]} } },
      { type: "scale", config: { scale: { list: [
        { value: 0.05, time: 0 },
        { value: 1, time: 0.2 },
        { value: 1.5, time: 0.4 },
        { value: 0.8, time: 0.8 },
        { value: 0, time: 1 }
      ]}, minMult: 0.3 } },
      { type: "moveSpeed", config: { speed: { list: [
        { value: 150, time: 0 },
        { value: 80, time: 0.3 },
        { value: 10, time: 1 }
      ]}, minMult: 0.2 } },
      { type: "acceleration", config: { accel: { x: 0, y: -30 } } },
      { type: "rotation", config: { accel: { list: [
        { value: 0, time: 0 },
        { value: 0, time: 1 }
      ]}, minMult: 0, maxMult: 3 } },
      { type: "randomDrift", config: { driftMin: 20, driftMax: 60 } }
    ]
  },

  // === 魔法/特效类 ===

  "magic_fire": {
    // 火焰喷射 — 向上的火柱
    lifetime: { min: 0.3, max: 0.8 },
    frequency: 0.005,
    emitterLifetime: 0.5,
    maxParticles: 200,
    pos: { x: 0, y: 0 },
    behaviors: [
      { type: "spawnShape", config: { type: "circle", data: { radius: 8 } } },
      { type: "color", config: { color: { list: [
        { value: 0xFFFFFF, time: 0 },
        { value: 0xFFCC44, time: 0.2 },
        { value: 0xFF6600, time: 0.5 },
        { value: 0x441100, time: 1 }
      ]} } },
      { type: "alpha", config: { alpha: { list: [
        { value: 0.9, time: 0 },
        { value: 0.5, time: 0.5 },
        { value: 0, time: 1 }
      ]} } },
      { type: "scale", config: { scale: { list: [
        { value: 0.3, time: 0 },
        { value: 1, time: 0.3 },
        { value: 1.2, time: 0.6 },
        { value: 0, time: 1 }
      ]}, minMult: 0.4 } },
      { type: "moveSpeed", config: { speed: { list: [
        { value: 120, time: 0 },
        { value: 60, time: 0.5 },
        { value: 10, time: 1 }
      ]}, minMult: 0.3 } },
      { type: "acceleration", config: { accel: { x: 0, y: -40 } } },
      { type: "randomDrift", config: { driftMin: 10, driftMax: 30 } }
    ]
  },

  "magic_ice": {
    // 冰霜爆裂 — 蓝白色冰晶
    lifetime: { min: 0.5, max: 1.2 },
    frequency: 0.001,
    emitterLifetime: 0.2,
    maxParticles: 150,
    pos: { x: 0, y: 0 },
    behaviors: [
      { type: "spawnShape", config: { type: "circle", data: { radius: 5 } } },
      { type: "color", config: { color: { list: [
        { value: 0xFFFFFF, time: 0 },
        { value: 0xAAEEFF, time: 0.2 },
        { value: 0x4488CC, time: 0.5 },
        { value: 0x224466, time: 1 }
      ]} } },
      { type: "alpha", config: { alpha: { list: [
        { value: 0.8, time: 0 },
        { value: 0.6, time: 0.4 },
        { value: 0, time: 1 }
      ]} } },
      { type: "scale", config: { scale: { list: [
        { value: 0.2, time: 0 },
        { value: 1, time: 0.2 },
        { value: 0.8, time: 0.7 },
        { value: 0, time: 1 }
      ]}, minMult: 0.3 } },
      { type: "moveSpeed", config: { speed: { list: [
        { value: 100, time: 0 },
        { value: 40, time: 0.5 },
        { value: 5, time: 1 }
      ]}, minMult: 0.2 } },
      { type: "acceleration", config: { accel: { x: 0, y: -15 } } },
      { type: "rotation", config: { accel: { list: [
        { value: 90, time: 0 },
        { value: 30, time: 1 }
      ]}, minMult: 1, maxMult: 5 } },
      { type: "randomDrift", config: { driftMin: 15, driftMax: 40 } }
    ]
  },

  "magic_electric": {
    // 电光爆炸 — 紫色电弧
    lifetime: { min: 0.1, max: 0.4 },
    frequency: 0.001,
    emitterLifetime: 0.25,
    maxParticles: 120,
    pos: { x: 0, y: 0 },
    behaviors: [
      { type: "spawnShape", config: { type: "circle", data: { radius: 3 } } },
      { type: "color", config: { color: { list: [
        { value: 0xFFFFFF, time: 0 },
        { value: 0xCC88FF, time: 0.2 },
        { value: 0x6633CC, time: 0.5 },
        { value: 0x331166, time: 1 }
      ]} } },
      { type: "alpha", config: { alpha: { list: [
        { value: 1, time: 0 },
        { value: 0.4, time: 0.3 },
        { value: 0, time: 1 }
      ]} } },
      { type: "scale", config: { scale: { list: [
        { value: 0.1, time: 0 },
        { value: 1, time: 0.1 },
        { value: 0.6, time: 0.5 },
        { value: 0, time: 1 }
      ]}, minMult: 0.3 } },
      { type: "moveSpeed", config: { speed: { list: [
        { value: 350, time: 0 },
        { value: 150, time: 0.3 },
        { value: 20, time: 1 }
      ]}, minMult: 0.4 } },
      { type: "rotation", config: { accel: { list: [
        { value: 0, time: 0 },
        { value: 0, time: 1 }
      ]}, minMult: 0, maxMult: 8 } },
      { type: "randomDrift", config: { driftMin: 30, driftMax: 80 } }
    ]
  },

  "magic_rainbow": {
    // 七彩星爆 — 彩虹色定向散射
    lifetime: { min: 0.4, max: 0.8 },
    frequency: 0.001,
    emitterLifetime: 0.15,
    maxParticles: 180,
    pos: { x: 0, y: 0 },
    behaviors: [
      { type: "spawnShape", config: { type: "circle", data: { radius: 3 } } },
      { type: "color", config: { color: { list: [
        { value: 0xFF0044, time: 0 },
        { value: 0xFF8800, time: 0.15 },
        { value: 0xFFDD00, time: 0.3 },
        { value: 0x00FF88, time: 0.5 },
        { value: 0x0088FF, time: 0.65 },
        { value: 0xAA00FF, time: 0.85 },
        { value: 0xFF00FF, time: 1 }
      ]} } },
      { type: "alpha", config: { alpha: { list: [
        { value: 1, time: 0 },
        { value: 0.7, time: 0.4 },
        { value: 0, time: 1 }
      ]} } },
      { type: "scale", config: { scale: { list: [
        { value: 0.2, time: 0 },
        { value: 1, time: 0.15 },
        { value: 0.6, time: 0.6 },
        { value: 0, time: 1 }
      ]}, minMult: 0.4 } },
      { type: "moveSpeed", config: { speed: { list: [
        { value: 200, time: 0 },
        { value: 80, time: 0.4 },
        { value: 10, time: 1 }
      ]}, minMult: 0.3 } },
      { type: "rotation", config: { accel: { list: [
        { value: 120, time: 0 },
        { value: 40, time: 1 }
      ]}, minMult: 2, maxMult: 6 } },
      { type: "randomDrift", config: { driftMin: 10, driftMax: 30 } }
    ]
  },

  "magic_smoke": {
    // 浓烟升起 — 爆炸后残留烟雾
    lifetime: { min: 1.0, max: 2.5 },
    frequency: 0.01,
    emitterLifetime: 0.8,
    maxParticles: 100,
    pos: { x: 0, y: 0 },
    behaviors: [
      { type: "spawnShape", config: { type: "circle", data: { radius: 10 } } },
      { type: "color", config: { color: { list: [
        { value: 0x888888, time: 0 },
        { value: 0x555555, time: 0.5 },
        { value: 0x333333, time: 1 }
      ]} } },
      { type: "alpha", config: { alpha: { list: [
        { value: 0.6, time: 0 },
        { value: 0.4, time: 0.3 },
        { value: 0, time: 1 }
      ]} } },
      { type: "scale", config: { scale: { list: [
        { value: 0.3, time: 0 },
        { value: 1.5, time: 0.5 },
        { value: 2, time: 1 }
      ]}, minMult: 0.5 } },
      { type: "moveSpeed", config: { speed: { list: [
        { value: 30, time: 0 },
        { value: 15, time: 0.5 },
        { value: 5, time: 1 }
      ]}, minMult: 0.3 } },
      { type: "acceleration", config: { accel: { x: 0, y: -25 } } },
      { type: "randomDrift", config: { driftMin: 20, driftMax: 50 } }
    ]
  },

  "magic_sparks": {
    // 火花散射 — 细小亮点快速飞散
    lifetime: { min: 0.15, max: 0.4 },
    frequency: 0.001,
    emitterLifetime: 0.1,
    maxParticles: 100,
    pos: { x: 0, y: 0 },
    behaviors: [
      { type: "spawnShape", config: { type: "circle", data: { radius: 2 } } },
      { type: "color", config: { color: { list: [
        { value: 0xFFFF88, time: 0 },
        { value: 0xFFCC44, time: 0.3 },
        { value: 0xFF6600, time: 1 }
      ]} } },
      { type: "alpha", config: { alpha: { list: [
        { value: 1, time: 0 },
        { value: 0.3, time: 0.4 },
        { value: 0, time: 1 }
      ]} } },
      { type: "scale", config: { scale: { list: [
        { value: 0.5, time: 0 },
        { value: 1, time: 0.1 },
        { value: 0.2, time: 1 }
      ]}, minMult: 0.2 } },
      { type: "moveSpeed", config: { speed: { list: [
        { value: 300, time: 0 },
        { value: 100, time: 0.5 },
        { value: 10, time: 1 }
      ]}, minMult: 0.5 } },
      { type: "acceleration", config: { accel: { x: 0, y: 50 } } },
      { type: "randomDrift", config: { driftMin: 20, driftMax: 60 } }
    ]
  },

  // === 环境/氛围类 ===

  "ambient_snow": {
    // 飘雪
    lifetime: { min: 3, max: 5 },
    frequency: 0.05,
    emitterLifetime: 0,
    maxParticles: 100,
    pos: { x: 0, y: -20 },
    behaviors: [
      { type: "spawnShape", config: { type: "rect", data: { x: -200, y: 0, w: 400, h: 10 } } },
      { type: "color", config: { color: { list: [
        { value: 0xFFFFFF, time: 0 },
        { value: 0xCCDDFF, time: 1 }
      ]} } },
      { type: "alpha", config: { alpha: { list: [
        { value: 0.8, time: 0 },
        { value: 0.4, time: 1 }
      ]} } },
      { type: "scale", config: { scale: { list: [
        { value: 0.5, time: 0 },
        { value: 1, time: 1 }
      ]}, minMult: 0.3 } },
      { type: "moveSpeed", config: { speed: { list: [
        { value: 20, time: 0 },
        { value: 30, time: 1 }
      ]}, minMult: 0.5 } },
      { type: "acceleration", config: { accel: { x: 0, y: 10 } } },
      { type: "randomDrift", config: { driftMin: 15, driftMax: 40 } }
    ]
  },

  "ambient_rain": {
    // 下雨
    lifetime: { min: 0.5, max: 1 },
    frequency: 0.02,
    emitterLifetime: 0,
    maxParticles: 200,
    pos: { x: 0, y: -20 },
    behaviors: [
      { type: "spawnShape", config: { type: "rect", data: { x: -200, y: 0, w: 400, h: 10 } } },
      { type: "color", config: { color: { list: [
        { value: 0x88AAFF, time: 0 },
        { value: 0x4466AA, time: 1 }
      ]} } },
      { type: "alpha", config: { alpha: { list: [
        { value: 0.6, time: 0 },
        { value: 0.2, time: 1 }
      ]} } },
      { type: "scale", config: { scale: { list: [
        { value: 0.3, time: 0 },
        { value: 0.8, time: 1 }
      ]}, minMult: 0.5 } },
      { type: "moveSpeed", config: { speed: { list: [
        { value: 400, time: 0 },
        { value: 400, time: 1 }
      ]}, minMult: 0.8 } },
      { type: "acceleration", config: { accel: { x: 0, y: 200 } } },
      { type: "randomDrift", config: { driftMin: 2, driftMax: 8 } }
    ]
  }
};

// 预设分类索引（供 AI 自动选择）
var PRESET_CATEGORIES = {
  "explosion": ["explosion_fireball", "explosion_shockwave", "explosion_debris", "explosion_nuke"],
  "magic":    ["magic_fire", "magic_ice", "magic_electric", "magic_rainbow"],
  "ambient":  ["ambient_snow", "ambient_rain"],
  "effect":   ["magic_smoke", "magic_sparks"]
};

// AI 自动选择：根据新闻情绪选择爆炸类型
function selectExplosionPreset(emotion) {
  var map = {
    "tension":    "explosion_fireball",
    "anger":      "explosion_nuke",
    "fear":       "explosion_shockwave",
    "joy":        "magic_rainbow",
    "sadness":    "magic_ice",
    "surprise":   "magic_electric",
    "default":    "explosion_fireball"
  };
  return map[emotion] || map.default;
}
