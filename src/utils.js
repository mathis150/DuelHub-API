export const isMongoId = (id) => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};

export const isValidPort = (port) => {
  const n = parseInt(port);
  return n >= 1 && n <= 65535;
};

export const isValidIp = (ip) => {
  return /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)(\.(?!$)|)){4}$/.test(ip);
};

export const isValidIpAndPort = (ip_port) => {
  return /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)(\.(?!$)|)){4}(:\d{1,5})$/.test(
    ip_port
  );
};
