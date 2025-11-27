    function checkNetwork() {
      const msg = document.getElementById('message');
      const statusNote = document.getElementById('statusNote');

      let isCell = false;
      let isWifi = false;

      if ('connection' in navigator) {
        const type = navigator.connection.type || navigator.connection.effectiveType;
        if (type && type.includes('cell')) isCell = true;
        if (type && type.includes('wifi')) isWifi = true;
      }

      let statusMsg = 'Network status: ';
      if (isWifi && isCell) statusMsg += 'Both WiFi and mobile are active.';
      else if (isWifi) statusMsg += 'WiFi only.';
      else if (isCell) statusMsg += 'mobile network only.';
      else statusMsg += 'Cannot determine or no connection.';

      msg.textContent = statusMsg;
    }

    window.addEventListener('load', checkNetwork);

    document.getElementById('wifiBtn').addEventListener('click', () => {
      // Robust detection of Android, Windows, iOS
      const ua = (navigator.userAgent || navigator.vendor || window.opera || '').toLowerCase();
      if (ua.includes('android')) {
        // Android Chrome/Firefox
        try {
          //window.location.href = 'intent://wifi/#Intent;scheme=android.settings.WIFI_SETTINGS;end';
          window.location.href = "intent:#Intent;action=android.settings.WIFI_SETTINGS;end;"
        } catch (e) {
          alert('Please open WiFi settings manually on your Android device.');
        }
      } else if (ua.includes('windows')) {
        // Windows PC
        window.location.href = 'ms-settings:network-wifi';
      } else if (ua.includes('iphone') || ua.includes('ipad') || ua.includes('ipod')) {
        // iOS devices
        window.location.href = 'App-Prefs:root=WIFI';
      } else {
        alert('Your device does not support automatic opening of WiFi settings. Please open it manually.');
      }
    });
