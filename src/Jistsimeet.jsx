// components/JitsiMeeting.jsx
import React, { useEffect, useRef } from 'react';

const JitsiMeeting = ({ roomName, onApiReady }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const loadJitsiScript = () => {
      if (window.JitsiMeetExternalAPI) return Promise.resolve();
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://meet.jit.si/external_api.js';
        script.onload = resolve;
        document.body.appendChild(script);
      });
    };

    loadJitsiScript().then(() => {
      const domain = 'meet.jit.si';
      const options = {
        roomName,
        parentNode: containerRef.current,
        userInfo: {
          displayName: 'Azad Instructor',
          email: 'instructor@azadedu.pk',
        },
        configOverwrite: {
          startWithAudioMuted: false,
          prejoinPageEnabled: false,
        },
        interfaceConfigOverwrite: {
          DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
        },
      };

      const api = new window.JitsiMeetExternalAPI(domain, options);

      if (onApiReady) {
        onApiReady(api); // used to trigger hostJoined
      }

      return () => api.dispose();
    });
  }, [roomName, onApiReady]);

  return (
    <div
      ref={containerRef}
      className="w-full h-[70vh] rounded-xl overflow-hidden shadow-lg border border-gray-300"
    />
  );
};

export default JitsiMeeting;
