
export interface Question {
  id: number;
  text: string;
  options: {
    label: string;
    value: 'A' | 'B' | 'C';
    text: string;
  }[];
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "当你想到明天要上班，你最抗拒的是哪种感觉？",
    options: [
      { label: 'A', value: 'A', text: "又要做那些自己不太擅长的事情" },
      { label: 'B', value: 'B', text: "又要面对现在的团队或领导" },
      { label: 'C', value: 'C', text: "又是干了也没什么结果的一天" },
    ]
  },
  {
    id: 2,
    text: "工作中，最容易让你突然很烦的是哪种情况？",
    options: [
      { label: 'A', value: 'A', text: "被安排去做自己不太顺手的事情" },
      { label: 'B', value: 'B', text: "和某些人沟通或配合" },
      { label: 'C', value: 'C', text: "明明做了很多，但没人当回事" },
    ]
  },
  {
    id: 3,
    text: "如果现在可以只改一件事，你最想改的是？",
    options: [
      { label: 'A', value: 'A', text: "现在这份工作的做事方式" },
      { label: 'B', value: 'B', text: "所在的团队或上级" },
      { label: 'C', value: 'C', text: "回报和晋升机制" },
    ]
  },
  {
    id: 4,
    text: "你最常冒出来的一种想法是？",
    options: [
      { label: 'A', value: 'A', text: "这工作是不是根本不适合我" },
      { label: 'B', value: 'B', text: "是不是换个团队就不会这么难受" },
      { label: 'C', value: 'C', text: "我是不是白干了这么久" },
    ]
  },
  {
    id: 5,
    text: "你最羡慕别人的哪种工作状态？",
    options: [
      { label: 'A', value: 'A', text: "做事很轻松，不用太费劲" },
      { label: 'B', value: 'B', text: "团队关系简单，没那么多内耗" },
      { label: 'C', value: 'C', text: "做了就有结果，回报很清楚" },
    ]
  },
  {
    id: 6,
    text: "最近让你最累的，更像是哪种情况？",
    options: [
      { label: 'A', value: 'A', text: "做事一直很费劲" },
      { label: 'B', value: 'B', text: "人际关系一直很消耗" },
      { label: 'C', value: 'C', text: "看不到什么回报" },
    ]
  },
  {
    id: 7,
    text: "什么时候你最容易产生想离职的念头？",
    options: [
      { label: 'A', value: 'A', text: "发现以后还是要一直做自己不擅长的事情" },
      { label: 'B', value: 'B', text: "和领导或同事相处很不舒服" },
      { label: 'C', value: 'C', text: "发现努力也没什么用" },
    ]
  },
  {
    id: 8,
    text: "如果暂时不离职，你最想先确认哪件事？",
    options: [
      { label: 'A', value: 'A', text: "换种做事方式会不会好一点" },
      { label: 'B', value: 'B', text: "换个环境会不会轻松一点" },
      { label: 'C', value: 'C', text: "回报变好之后会不会更有动力" },
    ]
  }
];

export const RESULTS_INFO = {
  A: {
    title: "结构错配",
    desc: "你现在更容易累的地方，不是努力不够，而是这份工作对你的要求，和你擅长的做事方式不太一致。",
    detail: "你可能不是做不了，而是做起来总觉得费劲、不顺手，时间久了就特别容易消耗。",
    advice: "你下一步最值得先验证的是：如果换一种更适合自己的做事方式，状态会不会明显好一点。"
  },
  B: {
    title: "环境错配",
    desc: "你现在更大的消耗，可能不在工作本身，而在你所处的团队、关系和氛围里。",
    detail: "很多事情你未必不能做，但人际压力、管理方式或者环境内耗，会让你越来越想离开。",
    advice: "你下一步最值得先验证的是：如果换一个环境，你的状态会不会明显轻松很多。"
  },
  C: {
    title: "反馈错配",
    desc: "你现在的问题，更像是投入和回报不成正比。",
    detail: "你可能已经做了很多，也扛了很多，但长期缺少认可、成长或明确回报，时间久了就会怀疑自己是不是白干了。",
    advice: "你下一步最值得先验证的是：如果回报机制更清晰一点，你会不会重新找回动力。"
  }
};
