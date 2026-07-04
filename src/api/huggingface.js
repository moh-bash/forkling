/**
 * Hugging Face Hub API wrapper for Forkling.
 * Used exclusively by the LLM Explorer section.
 */

import { fetchWithCache } from './cache';

const BASE = 'https://huggingface.co/api';

function getHeaders() {
  const headers = {};
  const token = localStorage.getItem('forkling_hf_token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

/**
 * Search models on Hugging Face Hub.
 */
export async function searchModels({ search = '', pipeline_tag = '', sort = 'downloads', direction = -1, limit = 30, skip = 0 } = {}) {
  const params = new URLSearchParams();
  if (search) params.set('search', search);
  if (pipeline_tag) params.set('pipeline_tag', pipeline_tag);
  params.set('sort', sort);
  params.set('direction', String(direction));
  params.set('limit', String(limit));
  if (skip > 0) params.set('skip', String(skip));

  const url = `${BASE}/models?${params.toString()}`;
  return fetchWithCache(url, { headers: getHeaders() });
}

/**
 * Get a single model's details.
 */
export async function getModel(modelId) {
  const url = `${BASE}/models/${encodeURIComponent(modelId)}`;
  return fetchWithCache(url, { headers: getHeaders() });
}

/**
 * Test if a HF token is valid.
 */
export async function testHFToken(token) {
  try {
    const response = await fetch('https://huggingface.co/api/whoami-v2', {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Pipeline tag metadata.
 * `iconKey` is resolved to a react-icon component in the UI layer — never an emoji.
 * This keeps the API module free of JSX dependencies.
 */
export const PIPELINE_TAGS = {
  'text-generation':             { label: 'Text Generation',    iconKey: 'chat'       },
  'text-classification':         { label: 'Text Classification',iconKey: 'tag'        },
  'token-classification':        { label: 'Token Class.',       iconKey: 'token'      },
  'question-answering':          { label: 'Question Answering', iconKey: 'qa'         },
  'summarization':               { label: 'Summarization',      iconKey: 'summary'    },
  'translation':                 { label: 'Translation',        iconKey: 'translate'  },
  'text2text-generation':        { label: 'Text-to-Text',       iconKey: 'text2text'  },
  'fill-mask':                   { label: 'Fill Mask',          iconKey: 'mask'       },
  'image-classification':        { label: 'Image Class.',       iconKey: 'image'      },
  'image-to-text':               { label: 'Image to Text',      iconKey: 'imgtext'    },
  'text-to-image':               { label: 'Text to Image',      iconKey: 'textimg'    },
  'automatic-speech-recognition':{ label: 'Speech Recognition', iconKey: 'speech'     },
  'text-to-speech':              { label: 'Text to Speech',     iconKey: 'tts'        },
  'feature-extraction':          { label: 'Feature Extraction', iconKey: 'embed'      },
};

/**
 * Returns the Hugging Face org/user avatar URL.
 * Format: https://huggingface.co/{author}/resolve/main/avatar.png
 * Falls back to the HF API thumbnail endpoint.
 */
export function getOrgAvatarUrl(authorOrModelId) {
  const author = authorOrModelId?.split('/')[0] || '';
  if (!author) return null;
  return `https://huggingface.co/${encodeURIComponent(author)}/resolve/main/avatar.png`;
}

/**
 * Classify a license as permissive, restrictive, or unknown.
 */
export function classifyLicense(license) {
  if (!license) return 'unknown';
  const l = license.toLowerCase();
  const permissive = ['mit', 'apache-2.0', 'bsd-2-clause', 'bsd-3-clause', 'isc', 'cc-by-4.0', 'cc-by-sa-4.0', 'unlicense', 'wtfpl'];
  const restrictive = ['gpl', 'agpl', 'lgpl', 'cc-by-nc', 'cc-by-nc-sa', 'cc-by-nc-nd', 'bigscience-bloom-rail', 'llama2', 'llama3'];
  if (permissive.some(p => l.includes(p))) return 'permissive';
  if (restrictive.some(r => l.includes(r))) return 'restrictive';
  return 'unknown';
}
