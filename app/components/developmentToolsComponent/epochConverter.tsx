"use client";
import React, { useState, useEffect } from "react";
import { Button, Input, DatePicker, message, Tooltip, Card, Typography, Space, Row, Col, ConfigProvider, theme } from "antd";
import dayjs, { Dayjs } from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";
import { CopyOutlined, ReloadOutlined, DeleteOutlined } from "@ant-design/icons";

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

const { Title, Text } = Typography;

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

    const num = Number(val);
    if (!isNaN(num)) {
      // Auto-detect milliseconds if value is large (simple heuristic: > 10000000000 implies likely ms for recent dates)
      // Standard unix timestamp for today is ~1.7e9 (10 digits). MS is ~1.7e12 (13 digits).
      // However, user might toggle the switch manually.
      // We'll trust the toggle or update the date based on current toggle.
      const timestampInMs = isMilliseconds ? num : num * 1000;
      setDate(dayjs(timestampInMs));
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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    message.success("Copied to clipboard!");
  };

  // Derived values for display
  const currentDayjs = timestamp ? dayjs(isMilliseconds ? Number(timestamp) : Number(timestamp) * 1000) : null;
  const isValid = currentDayjs && currentDayjs.isValid();

  return (
    <div className={`${DevelopmentToolsStyles.developmentToolsContainer} w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8 md:mt-8 mt-4`}>
     <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
          components: {
            Input: {
              colorBgContainer: '#000',
              borderColor: '#444',
            },
            DatePicker: {
              colorBgContainer: '#000',
              borderColor: '#444',
            },
          }
        }}
      >
      <div className="md:w-[90%] mx-auto">
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          
          {/* Controls */}
          <Row gutter={[16, 16]} align="middle">
             <Col xs={24} md={12}>
                <Space>
                    <Button type="primary" onClick={setNow} icon={<ReloadOutlined />}>Now</Button>
                    <Button onClick={clear} icon={<DeleteOutlined />}>Clear</Button>
                    <Button onClick={toggleUnit}>
                        Switch to {isMilliseconds ? "Seconds" : "Milliseconds"}
                    </Button>
                </Space>
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
             <div className="bg-black/40 p-6 rounded-xl mt-6 border border-gray-800">
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12}>
                        <div className="bg-black p-4 rounded-lg border border-gray-800">
                             <Text type="secondary" className="block mb-2 text-xs uppercase tracking-wider">Local Time</Text>
                             <div className="flex justify-between items-center">
                                <Text copyable={{ text: currentDayjs.format('YYYY-MM-DD HH:mm:ss') }} className="text-lg font-mono text-green-400">
                                    {currentDayjs.format('YYYY-MM-DD HH:mm:ss')}
                                </Text>
                             </div>
                        </div>
                    </Col>
                    <Col xs={24} sm={12}>
                        <div className="bg-black p-4 rounded-lg border border-gray-800">
                            <Text type="secondary" className="block mb-2 text-xs uppercase tracking-wider">UTC Time</Text>
                            <div className="flex justify-between items-center">
                                <Text copyable={{ text: currentDayjs.utc().format('YYYY-MM-DD HH:mm:ss') + " UTC" }} className="text-lg font-mono text-blue-400">
                                    {currentDayjs.utc().format('YYYY-MM-DD HH:mm:ss')} UTC
                                </Text>
                            </div>
                        </div>
                    </Col>
                    <Col xs={24} sm={12}>
                       <div className="bg-black p-4 rounded-lg border border-gray-800">
                            <Text type="secondary" className="block mb-2 text-xs uppercase tracking-wider">ISO 8601</Text>
                            <div className="flex justify-between items-center">
                                <Text copyable={{ text: currentDayjs.toISOString() }} className="text-sm font-mono text-yellow-500 break-all">
                                    {currentDayjs.toISOString()}
                                </Text>
                            </div>
                        </div>
                    </Col>
                    <Col xs={24} sm={12}>
                        <div className="bg-black p-4 rounded-lg border border-gray-800 h-full flex flex-col justify-center">
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
