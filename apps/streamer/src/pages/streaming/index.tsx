import { useState } from 'react';
import { FaVideo, FaMicrophone, FaPlus, FaTimes, FaPlay, FaEye, FaSmile, FaChevronLeft, FaArrowRight, FaCrown } from 'react-icons/fa';
import * as S from './streaming.style';

interface StreamingSettings {
  title: string;
  quality: string;
  bitrate: string;
  tags: string[];
}

export const StreamingPage: React.FC = () => {
  const [activeScene, setActiveScene] = useState('main');
  const [settings, setSettings] = useState<StreamingSettings>({
    title: '실시간 스트림',
    quality: '1080p 60fps',
    bitrate: '6000 Kbps',
    tags: ['게임', '소통']
  });

  const devices = [
    { id: 'mic1', name: '마이크(FRAIS,JUSBAE-USB1)', type: 'audio' },
    { id: 'speak1', name: '스피커()', type: 'speaker' },
    { id: 'mic2', name: '마이크()', type: 'audio' },
    { id: 'cam1', name: '1080p 60fps', type: 'video' },
    { id: 'cam2', name: '1080p 60fps', type: 'video' },
  ];

  const handleStartStream = () => {
    // 스트리밍 시작 로직
  };

  const handleSettingsChange = (field: keyof StreamingSettings, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleAddTag = (tag: string) => {
    if (tag && !settings.tags.includes(tag)) {
      setSettings(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
  };

  const handleRemoveTag = (tag: string) => {
    setSettings(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const controlButtons = [
    { icon: <FaPlay />, text: '시작', primary: true },
    { icon: <FaVideo />, text: '', primary: false },
    { icon: <FaMicrophone />, text: '', primary: false },
    { icon: <FaPlay />, text: '버츄얼 모션', primary: true },
    { icon: <FaPlay />, text: '합동방송', primary: true },
  ];

  return (
    <S.StreamingContainer> 
      <S.StreamingViewContainer>
        <S.StreamSection>
          <S.StreamContent>
            <S.MainView />
          </S.StreamContent>
          
          <S.ControlPanel>
            {controlButtons.map((button, idx) => (
              <S.ControlButton 
                key={idx} 
                $primary={button.primary} 
                onClick={button.text ? handleStartStream : undefined}
              >
                {button.icon}
                {button.text && <span>{button.text}</span>}
              </S.ControlButton>
            ))}
          </S.ControlPanel>

          <S.MixerContainer>
            <S.SceneList>
              <h3>
                Scenes <button><FaPlus /></button>
              </h3>
              <S.Scene 
                className={activeScene === 'main' ? 'active' : ''}
                onClick={() => setActiveScene('main')}
              >
                main
              </S.Scene>
              <S.Scene 
                className={activeScene === 'sub' ? 'active' : ''}
                onClick={() => setActiveScene('sub')}
              >
                sub
              </S.Scene>
            </S.SceneList>

            <S.SourceList>
              <h3>Sources</h3>
              <S.Source>
                <span>비주얼</span>
                <FaEye />
              </S.Source>
              <S.Source>
                <span>디스코드</span>
                <FaEye />
              </S.Source>
              <S.Source>
                <span>배탕화면</span>
                <FaEye />
              </S.Source>
            </S.SourceList>
            
            <S.VolumeContainer>
              <h3>볼륨 믹서</h3>
              
              {[
                { label: '마이크', value: '65%' },
                { label: '스피커', value: '70%' }
              ].map((volume, idx) => (
                <S.VolumeSection key={idx}>
                  <div className="volume-label">{volume.label}</div>
                  <div className="volume-meter">
                    <div className="volume-scale">
                      {[-60, -40, -20, 0].map(val => (
                        <span key={val}>{val}</span>
                      ))}
                    </div>
                    <div className="volume-bar"></div>
                    <div className="volume-thumb" style={{ left: volume.value }}></div>
                  </div>
                </S.VolumeSection>
              ))}
            </S.VolumeContainer>
          </S.MixerContainer>
        </S.StreamSection>

        <S.ChatContainer>
          <div className="chat-header">
            <FaChevronLeft />
            <span>채팅</span>
          </div>
          
          <div className="chat-leaderboard">
            {[
              { rank: 1, name: '대 듀', points: '208,000', color: '#FF1B6D' },
              { rank: 2, name: '대구에듀', points: '98,000', color: '#FF7DCE' },
              { rank: 3, name: '감귤', points: '98,000', color: '#A15EFF' }
            ].map(item => (
              <div className="leaderboard-item" key={item.rank}>
                <div className="rank" style={{ backgroundColor: item.color }}>{item.rank}</div>
                <div className="name">{item.name}</div>
                <div className="points">{item.points}</div>
              </div>
            ))}
          </div>
          
          <div className="stream-info">
            <div className="stream-title">이상한 컴퓨터 : 오늘 있던 폼 없던 폼 다 죽었네</div>
            <div className="stream-subtitle">대듀팬 : 흠...</div>
          </div>
          
          <S.ChatList>
            <S.ChatItem>
              <div className="chat-message">
                <FaCrown style={{ color: '#FFD700' }} />
                <span className="username">대 듀 :</span>
                <span className="message">어려분 죄송해요</span>
              </div>
            </S.ChatItem>
          </S.ChatList>
          
          <div className="chat-input">
            <input type="text" placeholder="채팅창 문구" />
            <div className="input-controls">
              <FaSmile />
              <button><FaArrowRight /></button>
            </div>
          </div>
          
          <div className="chat-footer">
            <input type="checkbox" id="memberOnly" />
            <label htmlFor="memberOnly">멤버십 전용 채팅 활성화</label>
          </div>
        </S.ChatContainer>
      </S.StreamingViewContainer>

      <S.StreamingSettingsContainer>
        <S.SettingsSection>
          <h2>방송 설정</h2>
          <S.SettingsForm>
            <S.FormGroup>
              <label>방송 제목</label>
              <input
                type="text"
                placeholder="방송 제목을 입력하세요"
                value={settings.title}
                onChange={(e) => handleSettingsChange('title', e.target.value)}
              />
            </S.FormGroup>

            <S.FormGroup>
              <label>화질 설정</label>
              <select
                value={settings.quality}
                onChange={(e) => handleSettingsChange('quality', e.target.value)}
              >
                <option>1080p 60fps</option>
                <option>1080p 30fps</option>
                <option>720p 60fps</option>
              </select>
            </S.FormGroup>

            <S.FormGroup>
              <label>비트레이트</label>
              <select
                value={settings.bitrate}
                onChange={(e) => handleSettingsChange('bitrate', e.target.value)}
              >
                <option>6000 Kbps</option>
                <option>4500 Kbps</option>
                <option>3000 Kbps</option>
              </select>
            </S.FormGroup>

            <S.FormGroup>
              <label>방송 태그</label>
              <input
                type="text"
                placeholder="태그 입력"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleAddTag((e.target as HTMLInputElement).value);
                    (e.target as HTMLInputElement).value = '';
                  }
                }}
              />
            </S.FormGroup>
            
            <S.TagsContainer>
              {settings.tags.map((tag) => (
                <S.Tag key={tag}>
                  #{tag}
                  <button onClick={() => handleRemoveTag(tag)}><FaTimes /></button>
                </S.Tag>
              ))}
            </S.TagsContainer>
          </S.SettingsForm>
        </S.SettingsSection>

        <S.SettingsSection>
          <h2>디바이스 설정</h2>
          <S.DeviceList>
            {devices
              .filter(d => d.type === 'audio' || d.type === 'speaker')
              .map(device => (
                <S.DeviceItem key={device.id}>
                  <input
                    type="radio"
                    name={device.type}
                    id={device.id}
                    defaultChecked={device.id === 'mic1'}
                  />
                  <label htmlFor={device.id}>{device.name}</label>
                </S.DeviceItem>
              ))}
          </S.DeviceList>
        </S.SettingsSection>

        <S.SettingsSection>
          <h2>통계</h2>
          <S.StatsGrid>
            {[
              { label: '시청자 수', value: '103,041' },
              { label: '평균 시청 시간', value: '00:10' },
              { label: '채팅 수', value: '3' }
            ].map((stat, idx) => (
              <S.StatItem key={idx}>
                <div className="label">{stat.label}</div>
                <div className="value">{stat.value}</div>
              </S.StatItem>
            ))}
          </S.StatsGrid>
        </S.SettingsSection>
      </S.StreamingSettingsContainer>
    </S.StreamingContainer>
  );
};
