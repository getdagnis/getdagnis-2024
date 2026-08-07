import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { db } from '../../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

import './ProjectReactions.css';
import smartImg from '@assets/react-icons/react_smart.svg';
import pooImg from '@assets/react-icons/react_poo.svg';
import partyImg from '@assets/react-icons/react_party.svg';
import hipsterImg from '@assets/react-icons/react_hip.svg';
import winnerImg from '@assets/react-icons/react_cup.svg';
import confusingImg from '@assets/react-icons/react_confuse.svg';
import boringImg from '@assets/react-icons/react_zz.svg';
import loveImg from '@assets/react-icons/react_love.svg';

const imageMap = {
  'react_love.svg': loveImg,
  'react_smart.svg': smartImg,
  'react_poo.svg': pooImg,
  'react_party.svg': partyImg,
  'react_hip.svg': hipsterImg,
  'react_cup.svg': winnerImg,
  'react_confuse.svg': confusingImg,
  'react_zz.svg': boringImg,
};

const ProjectReactions = ({ projectKey }) => {
  const savedReaction = localStorage.getItem(`reaction-${projectKey}`);
  const [activeReactionKey, setActiveReactionKey] = useState(savedReaction);
  const [reactions, setReactions] = useState(null); // Holds Firestore reactions
  const [isUpdating, setIsUpdating] = useState(false); // To prevent double updates
  const [isCountTransitioning, setIsCountTransitioning] = useState(null); // CSS transition flag

  // Fetch reactions from Firestore on component load
  useEffect(() => {
    const fetchData = async () => {
      if (projectKey) {
        const projectDocRef = doc(db, 'reactions', projectKey);
        const projectDoc = await getDoc(projectDocRef);

        if (projectDoc.exists()) {
          setReactions(projectDoc.data()); // Store Firestore data in state
        } else {
          setReactions({ reactions: {} }); // Empty if no data exists
        }
      }
    };

    fetchData();
  }, [projectKey]);

  // Update Firestore reaction count and local state
  const updateReactionCount = async (reactionKey, newCount) => {
    if (newCount < 0) return; // Prevent negative counts

    const projectDocRef = doc(db, 'reactions', projectKey);

    try {
      // Update Firestore
      await updateDoc(projectDocRef, {
        [`reactions.${reactionKey}.count`]: newCount,
      });

      // Update local state with new count
      setReactions((prevReactions) => {
        const updatedReactions = { ...prevReactions };
        updatedReactions.reactions[reactionKey].count = newCount;
        return updatedReactions;
      });
    } catch (error) {
      console.error('Error updating reaction count: ', error);
    }
  };

  const handleReactionClick = async (reactionKey) => {
    if (isUpdating || !reactions) return; // Prevent double updates

    setIsUpdating(true);
    setIsCountTransitioning(reactionKey); // Apply CSS transition to the clicked reaction

    const currentReactionCount = reactions?.reactions?.[reactionKey]?.count || 0;

    if (reactionKey === activeReactionKey) {
      // Remove reaction if it's already active
      await updateReactionCount(reactionKey, currentReactionCount - 1);
      setActiveReactionKey(null);
      localStorage.removeItem(`reaction-${projectKey}`);
    } else {
      // Remove +1 from the previous reaction if any
      if (activeReactionKey) {
        const previousReactionCount = reactions?.reactions?.[activeReactionKey]?.count || 0;
        await updateReactionCount(activeReactionKey, previousReactionCount - 1);
      }

      // Add +1 to the new reaction
      await updateReactionCount(reactionKey, currentReactionCount + 1);
      setActiveReactionKey(reactionKey);
      localStorage.setItem(`reaction-${projectKey}`, reactionKey);
    }

    // Simulate delay to match CSS transition
    setTimeout(() => {
      setIsUpdating(false); // Unlock UI after updating
      setIsCountTransitioning(null); // Clear transition effect
    }, 1000);
  };

  return (
    <div id="project-reactions">
      <h3 className="reactions-title">Your reaction</h3>
      <ul className="reactions">
        {reactions &&
          reactions['reactions'] &&
          Object.entries(reactions['reactions']).map(([key, reaction], index) => (
            <li key={index}>
              <img
                src={imageMap[reaction.img]}
                alt={reaction.alt}
                className={
                  activeReactionKey === null
                    ? 'reaction-default'
                    : key === activeReactionKey
                      ? 'reaction-active'
                      : 'reaction-inactive'
                }
                onClick={() => handleReactionClick(key)}
              />
              <span className={`reaction-count ${isCountTransitioning === key ? 'reaction-count-updating' : ''}`}>
                {reaction.alt}&nbsp;{reaction.count > 0 && `(${reaction.count})`}
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
};
export default ProjectReactions;

ProjectReactions.propTypes = {
  projectKey: PropTypes.string.isRequired,
};
