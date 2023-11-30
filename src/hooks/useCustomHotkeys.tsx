import { useEffect, useCallback, useRef } from "react";

/**
 * 키보드 단축키 및 키 시퀀스를 처리하기 위한 커스텀 React 훅입니다.
 *
 * @param {string | string[]} hotkeys - 단일 키, 키 조합('Control+Shift+N'과 같이 '+'로 연결), 순차적 키 시퀀스('a b c'), 또는 이러한 조합들의 배열입니다.
 * @param {() => void} callback - 단축키가 눌렸을 때 호출할 함수입니다.
 */
const useCustomHotkeys = (hotkeys: string | string[], callback: () => void): void => {
    // 키 시퀀스 상태를 저장하기 위한 ref
    const sequenceRef = useRef<string[]>([]);
    const timeoutRef = useRef<number | null>(null);

    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            console.log("useCustomHotkeys ~ event:", event);
            const keys = Array.isArray(hotkeys) ? hotkeys : [hotkeys];

            keys.forEach((key) => {
                const sequence = sequenceRef.current;
                const keySequence = key.split(" ");

                // 키 시퀀스 처리
                if (keySequence.length > 1) {
                    sequence.push(event.key);
                    if (timeoutRef.current) clearTimeout(timeoutRef.current);

                    // 시퀀스 내 모든 키가 순서대로 눌렸는지 확인
                    if (sequence.join(" ") === keySequence.join(" ")) {
                        event.preventDefault();
                        callback();
                        sequenceRef.current = []; // 시퀀스 초기화
                    } else if (
                        sequence.length === keySequence.length ||
                        !keySequence.includes(sequence[sequence.length - 1])
                    ) {
                        sequenceRef.current = []; // 시퀀스가 일치하지 않으면 초기화
                    }

                    // 사용자가 다음 키를 누를 시간을 주기 위해 타임아웃 설정
                    timeoutRef.current = window.setTimeout(() => {
                        sequenceRef.current = []; // 시간 초과시 시퀀스 초기화
                    }, 500); // 0.5초 타임아웃 (필요에 따라 조정 가능)
                } else {
                    // 단일 키 또는 키 조합 처리
                    const isCorrectKey = event.key === keySequence[0];
                    const isCorrectModifiers =
                        (!key.includes("Meta") || event.metaKey) &&
                        (!key.includes("Control") || event.ctrlKey) &&
                        (!key.includes("Shift") || event.shiftKey) &&
                        (!key.includes("Alt") || event.altKey);

                    if (isCorrectKey && isCorrectModifiers) {
                        event.preventDefault();
                        callback();
                    }
                }
            });
        },
        [hotkeys, callback],
    );

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            // 시퀀스 타임아웃이 설정되어 있다면 제거
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [handleKeyDown]);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);
};

export default useCustomHotkeys;
