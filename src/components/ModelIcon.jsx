/**
 * ModelIcon — consistent icon system for the LLM Explorer.
 *
 * Priority:
 *   1. Org/author avatar from Hugging Face (real provider logo)
 *   2. Pipeline-specific react-icon in a violet-tinted badge
 *   3. Generic TbBrain fallback in the same badge
 *
 * All containers are the same fixed size + corner radius so every
 * card looks uniform regardless of which tier renders.
 */

import { useState } from 'react';
import {
  TbBrain,
  TbMessageCircle,
  TbTag,
  TbAlphabetLatin,
  TbQuestionMark,
  TbFileText,
  TbLanguage,
  TbArrowsLeftRight,
  TbMask,
  TbPhoto,
  TbPhotoSearch,
  TbTextPlus,
  TbMicrophone,
  TbSpeakerphone,
  TbCpu,
} from 'react-icons/tb';

/** Maps iconKey (from PIPELINE_TAGS) → a react-icon component */
const ICON_MAP = {
  chat:      TbMessageCircle,
  tag:       TbTag,
  token:     TbAlphabetLatin,
  qa:        TbQuestionMark,
  summary:   TbFileText,
  translate: TbLanguage,
  text2text: TbArrowsLeftRight,
  mask:      TbMask,
  image:     TbPhoto,
  imgtext:   TbPhotoSearch,
  textimg:   TbTextPlus,
  speech:    TbMicrophone,
  tts:       TbSpeakerphone,
  embed:     TbCpu,
};

/** Violet-tinted badge that holds a react-icon — same dimensions as the avatar version */
function IconBadge({ iconKey, size }) {
  const Icon = ICON_MAP[iconKey] || TbBrain;
  const iconSize = size === 'lg' ? 'text-2xl' : 'text-base';
  const boxSize = size === 'lg' ? 'w-12 h-12 rounded-xl' : 'w-9 h-9 rounded-lg';
  return (
    <div
      className={`${boxSize} bg-violet-100 dark:bg-violet-950/30 flex items-center justify-center flex-shrink-0`}
      aria-hidden="true"
    >
      <Icon className={`${iconSize} text-violet-600 dark:text-violet-400`} />
    </div>
  );
}

/**
 * ModelIcon component.
 *
 * @param {string}  modelId   - Full HF model ID, e.g. "meta-llama/Llama-3-8B"
 * @param {string}  iconKey   - Key from PIPELINE_TAGS (e.g. "chat", "embed")
 * @param {'sm'|'lg'} size    - 'sm' = 36px card icon, 'lg' = 48px detail header
 */
export default function ModelIcon({ modelId, iconKey, size = 'sm' }) {
  const author = modelId?.split('/')[0] || '';
  // HF exposes org avatars at this URL — returns 404 for users without a custom avatar
  const avatarUrl = author
    ? `https://huggingface.co/${encodeURIComponent(author)}/resolve/main/avatar.png`
    : null;

  const [imgFailed, setImgFailed] = useState(false);

  const boxSize  = size === 'lg' ? 'w-12 h-12 rounded-xl' : 'w-9 h-9 rounded-lg';
  const imgSize  = size === 'lg' ? 48 : 36;

  // Try org avatar first; on any load error fall through to icon badge
  if (avatarUrl && !imgFailed) {
    return (
      <div className={`${boxSize} overflow-hidden flex-shrink-0 bg-violet-50 dark:bg-violet-950/20`}>
        <img
          src={avatarUrl}
          alt={author}
          width={imgSize}
          height={imgSize}
          className="w-full h-full object-cover"
          onError={() => setImgFailed(true)}
          loading="lazy"
        />
      </div>
    );
  }

  return <IconBadge iconKey={iconKey} size={size} />;
}
