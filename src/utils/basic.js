// export const BASE_URL = 'http://192.168.2.128:10010' // ph环境
// export const BASE_URL = 'http://192.168.2.218:10010' // bb环境

// export const BASE_URL = 'http://115.238.181.246:10010' // 测试环境
// export const BASE_URL = 'http://115.238.181.246:18889'  // 预生产环境
// export const BASE_URL = 'http://192.168.6.225:10010' // 正式环境

// export const BASE_URL = window.configuration?.MX_DATA_API?.BASE_URL || 'http://115.238.181.246:10010'
export const BASE_URL = window.configuration?.MX_DATA_API?.current_value || 'http://115.238.181.246:10010'
