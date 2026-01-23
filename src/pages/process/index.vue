<template>
  <div class="process-page">
    <!-- 引言区 -->
    <section class="hero-section">
      <div class="hero-overlay"></div>
      <div class="container hero-content">
        <div class="hero-text-wrapper">
          <h1 class="main-title">
            <span class="title-line">泥塑工艺</span>
          </h1>
          <p class="subtitle">
            一捏一描，千年魂
          </p>
          <p class="hero-description">
            泥彩人的制作融合了雕塑、绘画、民俗与信仰，历经选泥、塑形、阴干、打磨、上彩、开相等十余道工序。
          </p>
        </div>
        
        <!-- 视频播放器 -->
        <div class="video-container">
          <video controls width="100%" height="auto" class="spotlight-video">
            <source src="/src/assets/video/nicairen.mp4" type="video/mp4">
            您的浏览器不支持视频播放。
          </video>
        </div>
      </div>
    </section>

    <!-- 工艺流程图 -->
    <section class="section timeline-section">
      <div class="container">
        <div class="section-header text-center">
          <h2 class="section-heading">制作工序</h2>
          <p class="section-desc">每一个泥彩人都要经历这些精细的工序</p>
        </div>

        <div class="timeline-container">
          <div 
            v-for="(step, index) in processSteps" 
            :key="index"
            class="timeline-item"
            :class="{ 'active': activeStep === index }"
            @click="setActiveStep(index)"
          >
            <div class="timeline-step-number">{{ index + 1 }}</div>
            <div class="timeline-content">
              <h3 class="timeline-title">{{ step.title }}</h3>
              <p class="timeline-desc">{{ step.description }}</p>
            </div>
            <div class="timeline-media">
              <img :src="step.image" :alt="step.title" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 工具与材料展示 -->
    <section class="section materials-section">
      <div class="container">
        <div class="section-header text-center">
          <h2 class="section-heading">工具与材料</h2>
          <p class="section-desc">传统工具与天然材料</p>
        </div>

        <div class="materials-grid">
          <div 
            v-for="(material, index) in materials" 
            :key="index"
            class="material-card"
            @mouseenter="enlargeMaterial = index"
            @mouseleave="enlargeMaterial = null"
          >
            <div class="material-image" :class="{ 'enlarged': enlargeMaterial === index }">
              <img :src="material.image" :alt="material.name" />
            </div>
            <div class="material-info">
              <h3 class="material-name">{{ material.name }}</h3>
              <p class="material-desc">{{ material.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 匠人工作实录 -->
    <section class="section documentary-section">
      <div class="container">
        <div class="section-header text-center">
          <h2 class="section-heading">匠人工作实录</h2>
          <p class="section-desc">跟随传承人完成一件作品</p>
        </div>

        <div class="documentary-container">
          <div class="video-wrapper">
            <video 
              ref="documentaryVideo"
              :src="documentarySrc" 
              controls
              preload="metadata"
              @timeupdate="onVideoTimeUpdate"
            ></video>
          </div>
          
          <div class="current-step-indicator">
            <h3>当前步骤：</h3>
            <p>{{ currentStepByVideo }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 技艺难点解析 -->
    <section class="section faq-section">
      <div class="container">
        <div class="section-header text-center">
          <h2 class="section-heading">技艺难点解析</h2>
          <p class="section-desc">解答关于泥彩人制作的常见疑问</p>
        </div>

        <div class="faq-container">
          <div 
            v-for="(faq, index) in faqs" 
            :key="index"
            class="faq-item"
            @click="toggleFaq(index)"
          >
            <div class="faq-question">
              <h3>{{ faq.question }}</h3>
              <span class="faq-toggle">{{ openFaqs.includes(index) ? '−' : '+' }}</span>
            </div>
            <div 
              class="faq-answer" 
              v-if="openFaqs.includes(index)"
              :class="{ 'expanded': openFaqs.includes(index) }"
            >
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 底部引导 -->
    <section class="section cta-section">
      <div class="container">
        <div class="cta-content">
          <p>想亲手体验？ → <router-link to="/reserve">查看【非遗工坊预约】</router-link></p>
          <p>支持传承 → <router-link to="/shop">【购买正版泥彩人作品】</router-link></p>
        </div>
        
        <div class="social-share">
          <button class="share-btn">分享到社交媒体</button>
        </div>
      </div>
    </section>

    <!-- 情感升华 -->
    <footer class="process-footer">
      <div class="container">
        <p class="footer-quote">
          “泥土本无言，因手而有魂；色彩本无情，因心而生神。”
        </p>
        <p class="footer-attribution">—— 致每一位守护泥彩人的匠人</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// 工艺步骤数据
const processSteps = [
  {
    title: "选泥取土",
    description: "取本地黏性黄泥，反复捶打、过滤、醒泥",
    image: "@/assets/images/process-step1.jpg"
  },
  {
    title: "揉泥塑胎",
    description: "手工捏塑或模具成型，讲究“骨肉匀停”",
    image: "@/assets/images/process-step2.jpg"
  },
  {
    title: "阴干定型",
    description: "自然阴干7–15天，忌暴晒以防开裂",
    image: "@/assets/images/process-step3.jpg"
  },
  {
    title: "打磨修整",
    description: "用细砂纸或贝壳打磨表面",
    image: "@/assets/images/process-step4.jpg"
  },
  {
    title: "底漆打底",
    description: "涂刷胶矾水或白垩底，增强附着力",
    image: "@/assets/images/process-step5.jpg"
  },
  {
    title: "彩绘上色",
    description: "矿物颜料层层晕染，遵循“随类赋彩”",
    image: "@/assets/images/process-step6.jpg"
  },
  {
    title: "开相点睛",
    description: "最关键一步：点睛赋予“生命”",
    image: "@/assets/images/process-step7.jpg"
  },
  {
    title: "上光固色",
    description: "涂天然桐油或清漆，防潮保色",
    image: "@/assets/images/process-step8.jpg"
  }
];

// 工具与材料数据
const materials = [
  {
    name: "竹刀",
    image: "@/assets/images/tool-zhudao.jpg",
    description: "用于塑造细节和修整边缘"
  },
  {
    name: "骨针",
    image: "@/assets/images/tool-guzhen.jpg",
    description: "刻画精细纹理和面部特征"
  },
  {
    name: "毛笔",
    image: "@/assets/images/tool-maobi.jpg",
    description: "用于上色和描绘线条"
  },
  {
    name: "调色碟",
    image: "@/assets/images/tool-tiaose.jpg",
    description: "调制矿物颜料的专用工具"
  },
  {
    name: "泥拍子",
    image: "@/assets/images/tool-nipa.jpg",
    description: "用于拍打泥料，使其更加紧实"
  },
  {
    name: "朱砂颜料",
    image: "@/assets/images/material-zhusa.jpg",
    description: "传统红色颜料，色泽鲜艳持久"
  }
];

// 常见问题数据
const faqs = [
  {
    question: "为什么不能用机器代替手工？",
    answer: "泥彩人的神韵在于“手温”与即兴调整，机器无法捕捉人物表情的微妙变化。每一尊泥彩人都有独特的神态，这是机械复制无法达到的。"
  },
  {
    question: "颜料会褪色吗？",
    answer: "传统使用矿物颜料+桐油封护，百年不褪；现代部分改用丙烯，需特别说明。矿物颜料具有极强的稳定性和耐久性。"
  },
  {
    question: "制作一个泥彩人需要多长时间？",
    answer: "从选泥到完成，通常需要20-30天，其中阴干阶段就需要7-15天。每一步都需要耐心等待，急不得。"
  },
  {
    question: "如何辨别真假泥彩人？",
    answer: "真品泥彩人泥质细腻，色彩自然，手工痕迹明显，神态生动。仿品往往色彩过于鲜艳，缺乏岁月沉淀的质感。"
  }
];

// 状态管理
const activeStep = ref(0);
const enlargeMaterial = ref<number | null>(null);
const openFaqs = ref<number[]>([]);
const documentaryVideo = ref<HTMLVideoElement | null>(null);

// 假设的视频资源
const documentarySrc = ref('@/assets/video/documentary.mp4');

// 当前视频时间对应的步骤
const currentStepByVideo = computed(() => {
  if (!documentaryVideo.value) return processSteps[activeStep.value].title;
  
  const currentTime = documentaryVideo.value.currentTime;
  
  // 根据视频时间判断当前步骤（这里只是模拟）
  if (currentTime < 30) return processSteps[0].title; // 选泥取土
  if (currentTime < 60) return processSteps[1].title; // 揉泥塑胎
  if (currentTime < 90) return processSteps[2].title; // 阴干定型
  if (currentTime < 120) return processSteps[3].title; // 打磨修整
  if (currentTime < 150) return processSteps[4].title; // 底漆打底
  if (currentTime < 180) return processSteps[5].title; // 彩绘上色
  if (currentTime < 210) return processSteps[6].title; // 开相点睛
  return processSteps[7].title; // 上光固色
});

// 方法
const setActiveStep = (index: number) => {
  activeStep.value = index;
};

const toggleFaq = (index: number) => {
  const currentIndex = openFaqs.value.indexOf(index);
  if (currentIndex > -1) {
    openFaqs.value.splice(currentIndex, 1);
  } else {
    openFaqs.value.push(index);
  }
};

const onVideoTimeUpdate = () => {
  // 视频时间更新时不需要额外操作，computed 会自动更新
};
</script>

<style scoped>
.process-page {
  width: 100%;
  overflow-x: hidden;
  background-color: var(--color-bg);
}

/* 引言区样式 */
.hero-section {
  position: relative;
  height: auto;
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  color: #fff;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
              url('@/assets/images/process-hero-bg.jpg') center/cover no-repeat;
}

.hero-overlay {
  position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(120, 60, 20, 0.8) 0%,
      rgba(80, 40, 20, 0.6) 100%
    );
    z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 800px;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero-text-wrapper {
  margin: 0 auto 30px;
}

.main-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-bottom: 24px;
}

.title-line {
  font-size: 3.5rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  line-height: 1.2;
  color: #fff;
}

.title-line.accent {
  color: #d93b30;
  background: linear-gradient(to right, #d93b30, #ff6b62);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  font-size: 1.5rem;
  font-weight: 400;
  letter-spacing: 2px;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 16px;
}

.hero-description {
  font-size: 1.1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.85);
  max-width: 600px;
  margin: 0 auto 30px;
}

.video-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.spotlight-video {
  width: 100%;
  display: block;
}

/* 通用 section 样式 */
.section {
  padding: 100px 0;
  position: relative;
}

.section-header {
  margin-bottom: 60px;
}

.section-heading {
  font-size: 2.5rem;
  line-height: 1.2;
  margin-bottom: 20px;
  color: #2c3e50;
  font-weight: 800;
}

.section-desc {
  font-size: 1.1rem;
  color: #777;
  max-width: 600px;
  margin: 0 auto;
}

/* 工艺流程样式 */
.timeline-container {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.timeline-item {
  display: flex;
  align-items: center;
  padding: 30px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid #eee;
}

.timeline-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(217, 59, 48, 0.15);
  border-color: #d93b30;
}

.timeline-item.active {
  border-color: #d93b30;
  background: rgba(217, 59, 48, 0.03);
}

.timeline-step-number {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #d93b30;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: bold;
  margin-right: 25px;
  flex-shrink: 0;
}

.timeline-content {
  flex: 1;
}

.timeline-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 10px;
}

.timeline-desc {
  font-size: 1rem;
  color: #666;
  line-height: 1.6;
}

.timeline-media {
  width: 200px;
  height: 150px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
  margin-left: 20px;
}

.timeline-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 材料展示样式 */
.materials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
}

.material-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.material-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.material-image {
  height: 200px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.material-image.enlarged {
  transform: scale(1.1);
}

.material-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.material-info {
  padding: 20px;
}

.material-name {
  font-size: 1.3rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 10px;
}

.material-desc {
  font-size: 0.95rem;
  color: #666;
  line-height: 1.6;
}

/* 纪录片样式 */
.documentary-container {
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}

.video-wrapper {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
  height: 0;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.video-wrapper video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.current-step-indicator {
  margin-top: 30px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  display: inline-block;
}

.current-step-indicator h3 {
  margin: 0 0 10px 0;
  color: #2c3e50;
  font-weight: 600;
}

.current-step-indicator p {
  margin: 0;
  font-size: 1.1rem;
  color: #d93b30;
  font-weight: 600;
}

/* FAQ 样式 */
.faq-container {
  max-width: 800px;
  margin: 0 auto;
}

.faq-item {
  border-bottom: 1px solid #eee;
  margin-bottom: 15px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.faq-question {
  padding: 20px;
  background: #f8f9fa;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.faq-question h3 {
  margin: 0;
  font-size: 1.1rem;
  color: #2c3e50;
}

.faq-toggle {
  font-size: 1.5rem;
  font-weight: bold;
  color: #d93b30;
}

.faq-answer {
  padding: 0 20px;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease, padding 0.3s ease;
}

.faq-answer.expanded {
  padding: 20px;
  max-height: 500px;
}

.faq-answer p {
  margin: 0;
  color: #555;
  line-height: 1.7;
}

/* CTA 区域 */
.cta-section {
  background: linear-gradient(135deg, #f5f0eb 0%, #e8dfcc 100%);
  padding: 60px 0;
}

.cta-content {
  text-align: center;
  margin-bottom: 30px;
}

.cta-content p {
  font-size: 1.2rem;
  margin: 15px 0;
}

.cta-content a {
  color: #d93b30;
  font-weight: 600;
  text-decoration: none;
}

.cta-content a:hover {
  text-decoration: underline;
}

.social-share {
  text-align: center;
}

.share-btn {
  background: #d93b30;
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 30px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.share-btn:hover {
  background: #c23327;
  transform: translateY(-2px);
}

/* 页脚 */
.process-footer {
  background: #2c3e50;
  color: white;
  padding: 40px 0;
  text-align: center;
}

.footer-quote {
  font-size: 1.3rem;
  font-style: italic;
  margin-bottom: 10px;
  letter-spacing: 0.5px;
}

.footer-attribution {
  font-size: 1rem;
  color: #bbb;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .title-line {
    font-size: 2.8rem;
  }
  
  .subtitle {
    font-size: 1.2rem;
  }
  
  .section {
    padding: 60px 0;
  }
  
  .section-heading {
    font-size: 2rem;
  }
  
  .timeline-step-number {
    margin-right: 15px;
  }
  
  .materials-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .hero-section {
    height: 60vh;
  }
  
  .title-line {
    font-size: 2.2rem;
  }
  
  .subtitle {
    font-size: 1.2rem;
  }
  
  .section {
    padding: 60px 0;
  }
  
  .section-heading {
    font-size: 2rem;
  }
  
  .timeline-step-number {
    margin-right: 15px;
  }
  
  .materials-grid {
    grid-template-columns: 1fr;
  }
}
</style>