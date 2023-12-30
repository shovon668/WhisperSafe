import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft, faRandom } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';

const Home = () => {
  const [message, setMessage] = useState('');
  const [isMessageSent, setIsMessageSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [randomMessages, setRandomMessages] = useState([]);

  useEffect(() => {
    // Define your array of random messages with emojis here
    const messagesArray = [
      "You are stronger than you think. 💪",
      "Someone admires your courage. 🌟",
      "Your kindness doesn't go unnoticed. 🌈",
      "You make a positive impact on those around you. 👏",
      "You're doing great – keep going! 🚀",
      "What's a recent achievement you're proud of? 🏆",
      "Your hard work is paying off. 💼",
      "You are loved and appreciated. ❤️",
      "What's something you're looking forward to? 🌺",
      "You have a unique and valuable perspective. 🌐",
      "Your efforts make a difference. 🌍",
      "What's a goal you're currently working towards? 🎯",
      "You are not alone – reach out if you need support. 🤝",
      "Your presence is a gift to the world. 🌎",
      "What's something that always brings a smile to your face? 😊",
      "You are more resilient than you realize. 🌱",
      "What's a skill or talent you're proud of? 🎨",
      "You inspire others with your positive attitude. 🌞",
      "You're on the right path – trust the journey. 🛤️",
      "Believe in yourself; you're capable of amazing things. 🌈",
      "Someone is grateful for your presence in their life. 🙏",
      "Your potential is limitless. 🚀",
      "You bring joy to those around you. 😄",
      "Your creativity knows no bounds. 🎭",
      "You have the power to make a positive change. ⚡",
      "Your achievements speak volumes about your dedication. 🏅",
      "Your enthusiasm is contagious. 🌟",
      "You are a beacon of light in the lives of others. 💡",
      "Your presence makes the world a better place. 🌍",
      "You are worthy of love and respect. ❤️"
    ];
  
    setRandomMessages(messagesArray);
  }, []);
  

  const getRandomMessage = () => {
    const randomIndex = Math.floor(Math.random() * randomMessages.length);
    setMessage(randomMessages[randomIndex]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const token = process.env.NEXT_PUBLIC_API_SECRET_TOKEN;
      await simulateEncryption();
      await new Promise(resolve => setTimeout(resolve, 2000));
      await axios.post('/api/messages', { content: message }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('');
      setIsMessageSent(true);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const simulateEncryption = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  return (
    <div className="container">
      <section className="section">
        <div className="container">
          <h1 className="title has-text-centered is-size-2">WhisperSafe</h1>
          <p className='has-text-centered is-size-4'>
            It's me Shovon. Just trying another project. bla bla bla....
          </p><br></br>
          {isLoading && (
            <div className="notification is-info">
              <p>Loading...</p>
              <p>Your message is being encrypted.</p>
            </div>
          )}

          {isMessageSent && (
            <div className="notification is-success">
              <button className="delete" onClick={() => setIsMessageSent(false)}></button>
              Message sent successfully!
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="field has-addons">
              <div className="control is-expanded">
                <div style={{ position: 'relative' }}>
                  <textarea
                    id="message"
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="textarea is-size-3"
                    style={{ height: '200px' }}
                    placeholder='Write your anonymous message'
                    required
                  />
                  <button
                    type="button"
                    className="button is-primary"
                    style={{ position: 'absolute', bottom: 0, right: 0 }}
                    onClick={getRandomMessage}
                  >
                    <FontAwesomeIcon icon={faRandom} />
                  </button>
                </div>
              </div>
            </div>
            <div className="control">
              <button type="submit" className="button is-primary" disabled={isLoading}>
                Send
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="message is-info">
            <div className="message-header">
              <p className='is-size-4'>Disclaimer</p>
            </div>
            <div className="message-body">
              <p className='is-size-5'>
                Your message will be securely stored, and we don't store IP, cookies, or any metadata information about you.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
      <div className="container">
  <div className="content has-text-centered">
    <div className="social-links">
      <span className="icon-space"></span>
      <a href="https://facebook.com/minar.svn" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faFacebook} size="2x" />
      </a>
      <span className="icon-space" style={{ marginRight: '10px' }}></span>
      <a href="https://linkedin.com/in/minarsvn9090" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faLinkedin} size="2x" />
      </a>
    </div>
  </div>
</div>

      </section>
    </div>
  );
};

export default Home;
