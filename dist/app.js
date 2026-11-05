// Editorial content is sourced from the supplied CV and linked public repositories.
const projects = [
  {name:'BrainBind', category:'Neural representation learning', filter:'neuro', description:'Code for aligning EEG and fMRI recordings with video representations, including training, modality fusion and bidirectional retrieval evaluation.', stack:'PyTorch, EEG, fMRI', repo:'Brainbind'},
  {name:'Brain-to-robot decoding', category:'Brain–computer interfaces', filter:'neuro', description:'Models for decoding arm and hand trajectories from EEG and EMG, with robot simulation and confidence-based filtering of predictions.', stack:'Neural decoding, robotics', repo:'EEGDecoding_Robotarm'},
  {name:'Bidsify', category:'Research infrastructure', filter:'engineering', description:'A Python tool for converting neuroscience recordings into BIDS format. A configuration file specifies subjects, sessions and modalities; validation is optional.', stack:'Python, BIDS, multimodal data', repo:'Bidsify'},
  {name:'Data-driven optimisation', category:'Applied machine learning', filter:'engineering', description:'Code accompanying our iScience paper on electric vehicle charging infrastructure. The model compares planning objectives across different energy scenarios.', stack:'Optimisation, energy systems', repo:'MultiObjective-Optimization'}
];
const publications = [
 {venue:'BMVC', year:'2026 · Accepted', title:'BrainBind: Bridging Synchronized EEG and fMRI through Long-Form Naturalistic Video Representations.', authors:'Shixiao Wang, Rining Wu, Jian K. Liu.', url:'https://github.com/Forainest789/Brainbind', label:'Code ↗'},
 {venue:'NeurIPS', year:'2026', title:'Low-Rank Hierarchical Merging for Efficient Long-to-Short Reasoning.', authors:'Zeqiu Yu, Xuesheng Zhang, Wenxiao Zhao, Shixiao Wang.'},
 {venue:'ICAIS & ISAS', year:'2026', title:'Copilot-Assisted Second-Thought Framework for Brain-to-Robot Hand Motion Decoding.', authors:'Yizhe Li†, Shixiao Wang†, Jian K. Liu. † Equal contribution.', url:'https://github.com/Forainest789/EEGDecoding_Robotarm', label:'Code ↗'},
 {venue:'ICIC', year:'2026', title:'Efficient Parallel Compilation for Neural Networks on GPUs.', authors:'Shixiao Wang. LNBI 16669, pp. 88–99.'},
 {venue:'ACM MM', year:'2026', title:'Active Token Pruning for Efficient Multimodal Reasoning.', authors:'Shixiao Wang (contributing author).'},
 {venue:'ICASSP', year:'2025', title:'GSMM: Efficient Global Sparsification for Resource-Conscious Multimodal Models.', authors:'Wenlun Zhang, Haoran Pang, Yucai Zhou, Shixiao Wang, Luking Li.'},
 {venue:'iScience', year:'2023', title:'Data-driven multi-objective optimization for electric vehicle charging infrastructure.', authors:'Farzaneh Farhadi, Shixiao Wang, Roberto Palacin, Phil Blythe. 26(10), 107737.', url:'https://www.cell.com/iscience/pdf/S2589-0042(23)01814-X.pdf', label:'Paper ↗'}
];
const manuscripts = [
 ['The Cross-Subject Gap in EEG-to-3D Reconstruction: A Separability Analysis of Source-Only and Adapted Transfer.', 'First author · Submitted to AAAI 2027'],
 ['Anatomy Is Not Alignment: A Clean Audit of Cross-Dataset Transfer in fMRI-to-Image Decoding.', 'Under submission'],
 ['Escaping Statistical Aggregation: Lightweight Diffusion-Based Visual Reconstruction from Single-Trial Spike Sequences.', 'First author · Research manuscript'],
 ['Spikes2RGB: Conditional Latent Diffusion for Chromatic Spike Reconstruction.', 'Under submission']
];
const experience = [
 ['Apr – Oct 2026','National Institute of Informatics','Visiting PhD Researcher · Tokyo','I studied memory mechanisms in video generation and ran controlled experiments to distinguish the effect of memory content from the way it enters the model.'],
 ['Mar 2025 – Mar 2026','University of Birmingham · CHBH','Research Assistant','I processed EEG and fMRI data, trained models to align neural recordings with visual representations, and analysed retrieval and representational similarity.'],
 ['Oct 2024 – Jun 2025','University of Birmingham · CNCR','Research Assistant','I worked on arm and hand trajectory decoding from EEG and EMG, using the predicted trajectories in MuJoCo simulations of a Franka Panda robot.'],
 ['Apr 2023 – Aug 2024','Huawei Technologies','Multimodal AI Software Engineer · Hangzhou','I integrated multimodal components into MindSpeed-MM, reproduced diffusion and video-generation baselines, and worked on distributed training and performance analysis.'],
 ['Mar – Nov 2022','Newcastle University','Research Assistant','I worked on modelling and simulation for electric vehicle charging infrastructure, comparing four energy scenarios in Newcastle.']
];
const escapeHtml = value => value.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
document.querySelector('#projects').innerHTML = projects.map(p => `<article class="project" data-category="${p.filter}"><span class="category">${p.category}</span><h3>${p.name}</h3><p>${p.description}</p><div class="project-bottom"><small>${p.stack}</small><a class="text-link" href="https://github.com/Forainest789/${p.repo}" target="_blank" rel="noreferrer">View code ↗</a></div></article>`).join('');
document.querySelector('#publication-list').innerHTML = publications.map(p => `<article class="publication"><div class="venue">${escapeHtml(p.venue)}<span>${p.year}</span></div><div><h3>${escapeHtml(p.title)}</h3><p>${escapeHtml(p.authors).replaceAll('Shixiao Wang','<strong>Shixiao Wang</strong>')}</p></div>${p.url?`<a href="${p.url}" target="_blank" rel="noreferrer">${p.label}</a>`:''}</article>`).join('');
document.querySelector('#manuscript-list').innerHTML = manuscripts.map(([title,status]) => `<article class="manuscript"><p>${escapeHtml(title)}</p><small>${status}</small></article>`).join('');
document.querySelector('#experience-list').innerHTML = experience.map(([date,place,role,description]) => `<article class="experience"><small>${date}</small><h4>${place}</h4><p class="role">${role}</p><p>${description}</p></article>`).join('');
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
 document.querySelectorAll('[data-filter]').forEach(b => {b.classList.toggle('active', b===button);b.setAttribute('aria-pressed', String(b===button));});
 let count=0;
 document.querySelectorAll('.project').forEach(card => {card.hidden=button.dataset.filter!=='all' && card.dataset.category!==button.dataset.filter;if(!card.hidden) count++;});
 document.querySelector('#filter-status').textContent=`${count} projects shown`;
}));
