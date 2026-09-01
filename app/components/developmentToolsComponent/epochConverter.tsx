"use client";
import React, { useState } from "react";
import { Input, DatePicker, Typography, Space, Row, Col, ConfigProvider, theme } from "antd";
import dayjs, { Dayjs } from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";
import { ReloadOutlined, DeleteOutlined, CopyOutlined, CheckOutlined } from "@ant-design/icons";
import { trackEvent, PAGE_TYPE, getRuntimePlatform } from "@/app/libs/analytics";

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

const copyIconPair = [
  <CopyOutlined key="copy" className="text-primary" aria-hidden />,
  <CheckOutlined key="copied" className="text-primary" aria-hidden />,
] as const;

const { Text } = Typography;

const EpochConverter = () => {
  // Timestamp in seconds (string to allow clear/typing)
  const [timestamp, setTimestamp] = useState<string>(Math.floor(Date.now() / 1000).toString());
  // Date object for DatePicker
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  // Input mode: 'seconds' or 'milliseconds'
  const [isMilliseconds, setIsMilliseconds] = useState<boolean>(false);

  // Update inputs when timestamp changes
  const handleTimestampChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTimestamp(val);

    if (!val) {
      setDate(null);
      return;
    }

    // Enforce plain integer input
    if (/^-?\d+$/.test(val)) {
      const num = Number(val);
      const timestampInMs = isMilliseconds ? num : num * 1000;
      setDate(dayjs(timestampInMs));
    } else {
      // Invalid input, clear date to keep UI consistent
      setDate(null);
    }
  };

  const handleDateChange = (value: Dayjs | null) => {
    setDate(value);
    if (value) {
      const ms = value.valueOf();
      setTimestamp(isMilliseconds ? ms.toString() : Math.floor(ms / 1000).toString());
    } else {
      setTimestamp("");
    }
  };

  const setNow = () => {
    const now = dayjs();
    setDate(now);
    const ms = now.valueOf();
    setTimestamp(isMilliseconds ? ms.toString() : Math.floor(ms / 1000).toString());
  };

  const clear = () => {
    setTimestamp("");
    setDate(null);
  };

  const toggleUnit = () => {
    const newVal = !isMilliseconds;
    setIsMilliseconds(newVal);
    // Adjust current timestamp value
    if (timestamp) {
      const num = Number(timestamp);
      if (!isNaN(num)) {
        if (newVal) {
          // sec -> ms
          setTimestamp((num * 1000).toString());
        } else {
          // ms -> sec
          setTimestamp(Math.floor(num / 1000).toString());
        }
      }
    }
  };

  const trackCopy = () => {
    trackEvent("dev_tool_used", {
      page_type: PAGE_TYPE,
      platform: getRuntimePlatform(),
      tool_name: "Unix Timestamp Converter",
      tool_action: "Copy",
    });
  };

  // Derived values for display
  const validTimestamp = /^-?\d+$/.test(timestamp);
  const currentDayjs = validTimestamp ? dayjs(isMilliseconds ? Number(timestamp) : Number(timestamp) * 1000) : null;
  const isValid = currentDayjs && currentDayjs.isValid();

  return (
    <div className={`${DevelopmentToolsStyles.developmentToolsContainer} w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8 md:mt-8 mt-4`}>
      <ConfigProvider
        theme={{
          algorithm: [theme.darkAlgorithm],
          components: {
            Input: {
              colorBgContainer: '#000',
              colorBorder: '#444',
            },
            DatePicker: {
              colorBgContainer: '#000',
              colorBorder: '#444',
            },
          }
        }}
      >
        <div className="md:w-[90%] mx-auto">
          <Space direction="vertical" size="large" style={{ width: '100%' }}>

            {/* Controls */}
            <Row gutter={[16, 16]} align="middle">
              <Col xs={24} md={12}>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={setNow}
                    className={`${DevelopmentToolsStyles.converterButton} inline-flex items-center justify-center gap-2 text-black font-bold !py-2.5 !px-4 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/60`}
                  >
                    <ReloadOutlined />
                    Now
                  </button>
                  <button
                    type="button"
                    onClick={clear}
                    className={`${DevelopmentToolsStyles.clearButton} inline-flex items-center justify-center gap-2 text-black font-bold !py-2.5 !px-4 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-400/50`}
                  >
                    <DeleteOutlined />
                    Clear
                  </button>
                  <button
                    type="button"
                    onClick={toggleUnit}
                    className="px-3 py-2 rounded-xl border border-white/10 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/60"
                  >
                    Switch to {isMilliseconds ? "Seconds" : "Milliseconds"}
                  </button>
                </div>
              </Col>
            </Row>

            {/* Inputs */}
            <Row gutter={[24, 24]}>
              <Col xs={24} md={12}>
                <Text strong className="text-white block mb-2">Unix Timestamp ({isMilliseconds ? "Milliseconds" : "Seconds"})</Text>
                <Input
                  value={timestamp}
                  onChange={handleTimestampChange}
                  placeholder={`Enter timestamp in ${isMilliseconds ? "milliseconds" : "seconds"}...`}
                  size="large"
                  style={{ marginTop: 8 }}
                />
              </Col>
              <Col xs={24} md={12}>
                <Text strong className="text-white block mb-2">Date & Time (Local)</Text>
                <DatePicker
                  showTime
                  value={date}
                  onChange={handleDateChange}
                  style={{ width: '100%', marginTop: 8 }}
                  size="large"
                />
              </Col>
            </Row>

            {/* Outputs */}
            {isValid ? (
              <div className="bg-black/40 p-6 rounded-xl mt-6">
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={12}>
                    <div className="bg-black p-4 rounded-lg">
                      <Text type="secondary" className="block mb-2 text-xs uppercase tracking-wider">Local Time</Text>
                      <div className="flex justify-between items-center gap-2">
                        <Text
                          copyable={{
                            text: currentDayjs.format("YYYY-MM-DD HH:mm:ss"),
                            icon: [...copyIconPair],
                            onCopy: trackCopy,
                          }}
                          className="text-lg font-mono text-green-400 [&_.ant-typography-copy]:text-primary"
                        >
                          {currentDayjs.format("YYYY-MM-DD HH:mm:ss")}
                        </Text>
                      </div>
                    </div>
                  </Col>
                  <Col xs={24} sm={12}>
                    <div className="bg-black p-4 rounded-lg">
                      <Text type="secondary" className="block mb-2 text-xs uppercase tracking-wider">UTC Time</Text>
                      <div className="flex justify-between items-center gap-2">
                        <Text
                          copyable={{
                            text: `${currentDayjs.utc().format("YYYY-MM-DD HH:mm:ss")} UTC`,
                            icon: [...copyIconPair],
                            onCopy: trackCopy,
                          }}
                          className="text-lg font-mono text-blue-400 [&_.ant-typography-copy]:text-primary"
                        >
                          {currentDayjs.utc().format("YYYY-MM-DD HH:mm:ss")} UTC
                        </Text>
                      </div>
                    </div>
                  </Col>
                  <Col xs={24} sm={12}>
                    <div className="bg-black p-4 rounded-lg">
                      <Text type="secondary" className="block mb-2 text-xs uppercase tracking-wider">ISO 8601</Text>
                      <div className="flex justify-between items-center gap-2">
                        <Text
                          copyable={{
                            text: currentDayjs.toISOString(),
                            icon: [...copyIconPair],
                            onCopy: trackCopy,
                          }}
                          className="text-sm font-mono text-yellow-500 break-all [&_.ant-typography-copy]:text-primary"
                        >
                          {currentDayjs.toISOString()}
                        </Text>
                      </div>
                    </div>
                  </Col>
                  <Col xs={24} sm={12}>
                    <div className="bg-black p-4 rounded-lg h-full flex flex-col justify-center">
                      <Text type="secondary" className="block mb-2 text-xs uppercase tracking-wider">Relative Time</Text>
                      <Text className="text-xl font-bold text-white">
                        {currentDayjs.fromNow()}
                      </Text>
                    </div>
                  </Col>
                </Row>
              </div>
            ) : (
              timestamp && <Text type="danger">Invalid Timestamp</Text>
            )}

          </Space>
        </div>
      </ConfigProvider>
    </div>
  );
};

export default EpochConverter;
