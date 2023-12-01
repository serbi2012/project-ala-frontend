import { useEffect } from "react";

// 전역적으로 모든 단축키를 관리하는 맵
const hotkeysMap = new Map();

// 단축키 이벤트를 처리하는 함수
const handleGlobalKeyDown = (event: any) => {
    console.log("handleGlobalKeyDown ~ event:", event);
    hotkeysMap.forEach((callback, key) => {
        const keySequence = key.split("+").map((k: any) => k.trim());

        if (keySequence.length > 1) {
            const isCorrectModifiers = keySequence.every((k: any) => {
                switch (k) {
                    case "Control":
                        return event.ctrlKey;
                    case "Meta":
                        return event.metaKey;
                    case "Alt":
                        return event.altKey;
                    case "Shift":
                        return event.shiftKey;
                    default:
                        return event.code === k;
                }
            });

            if (isCorrectModifiers) {
                event.preventDefault();
                callback();
            }
        } else {
            if (event.code === keySequence[0]) {
                event.preventDefault();
                callback();
            }
        }
    });
};

// 단일 이벤트 리스너를 사용하여 모든 단축키를 처리하는 훅
const useCustomHotkeys = (hotkeys: string | string[], callback: () => void) => {
    useEffect(() => {
        const keys = Array.isArray(hotkeys) ? hotkeys : [hotkeys];
        keys.forEach((key) => hotkeysMap.set(key, callback));

        // 컴포넌트가 마운트될 때 단 한 번만 이벤트 리스너를 추가합니다.
        if (hotkeysMap.size === keys.length) {
            document.addEventListener("keydown", handleGlobalKeyDown);
        }

        // 컴포넌트가 언마운트될 때 해당 단축키를 제거합니다.
        return () => {
            keys.forEach((key) => hotkeysMap.delete(key));

            // 마지막 단축키가 제거되면 이벤트 리스너도 제거합니다.
            if (hotkeysMap.size === 0) {
                document.removeEventListener("keydown", handleGlobalKeyDown);
            }
        };
    }, [hotkeys, callback]);
};

export default useCustomHotkeys;
