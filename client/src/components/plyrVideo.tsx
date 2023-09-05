import { useEffect } from 'react';
import Plyr from 'plyr-react';
import 'plyr-react/plyr.css';
import { usePlayVideo } from '../hooks/useVideo';
import { FileType } from '../hooks/useUpload';

const videoOptions = {
  volume: 0.1
};

export const PlyrVideo = ({ videoFile }: { videoFile: FileType }) => {
  const { refPlyr, loadVideo } = usePlayVideo();

  useEffect(() => {
    if (videoFile?.path) {
      loadVideo(videoFile.path);
    }
  }, [loadVideo, videoFile]);

  const plyrVideo = (
    <Plyr
      id="plyr"
      ref={refPlyr}
      source={{} as Plyr.SourceInfo}
      options={videoOptions}
    />
  );

  return (
    <div>
      <h2>{videoFile.id}</h2>
      <div>{plyrVideo}</div>
    </div>
  );
};
