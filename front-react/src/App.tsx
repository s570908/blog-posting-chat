import { useCallback, useEffect, useRef } from 'react';

function App() {
  const mapElement = useRef(null);

  // Naver Map
  // useEffect(() => {
  //   const { naver } = window;
  //   if (!mapElement.current || !naver) return;

  //   const location = new naver.maps.LatLng(37.5656, 126.9769);
  //   const mapOptions: naver.maps.MapOptions = {
  //     center: location,
  //     zoom: 17,
  //     zoomControl: true,
  //     zoomControlOptions: {
  //       position: naver.maps.Position.TOP_RIGHT,
  //     },
  //   };
  //   const map = new naver.maps.Map(mapElement.current, mapOptions);
  //   new naver.maps.Marker({
  //     position: location,
  //     map,
  //   });
  // }, []);

  // Google Map
  const loadScript = useCallback((url: string) => {
    const firstScript = window.document.getElementsByTagName('script')[0];
    const newScript = window.document.createElement('script');
    newScript.src = url;
    newScript.async = true;
    newScript.defer = true;
    firstScript?.parentNode?.insertBefore(newScript, firstScript);
  }, []);

  // script에서 google map api를 가져온 후에 실행될 callback 함수
  const initMap = useCallback(() => {
    const { google } = window;
    if (!mapElement.current || !google) return;

    const location = { lat: 37.5656, lng: 126.9769 };
    const map = new google.maps.Map(mapElement.current, {
      zoom: 17,
      center: location,
    });
    new google.maps.Marker({
      position: location,
      map,
    });
  }, []);

  useEffect(() => {
    const script = window.document.getElementsByTagName('script')[0];
    const includeCheck = script.src.startsWith(
      'https://maps.googleapis.com/maps/api'
    );

    // script 중복 호출 방지
    if (includeCheck) return initMap();

    window.initMap = initMap;
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=AIzaSyDw0-HEZqxPmPnlGL2PpUGJWHLTNTLk68o&callback=initMap&language=en`
    );
  }, [initMap, loadScript]);

  return <div ref={mapElement} style={{ minHeight: '400px' }} />;
}

export default App;
