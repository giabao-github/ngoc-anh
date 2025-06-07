const Disclaimer = () => {
  return (
    <div className="text-xs text-gray-700 font-medium px-2">
      <p className="w-fit tracking-wide">
        Trang web này được bảo vệ bởi reCAPTCHA và tuân theo&nbsp;
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://policies.google.com/privacy"
          className="text-[#D4AF37] hover:underline font-semibold"
        >
          Chính sách bảo mật
        </a>
        &nbsp;và&nbsp;
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://policies.google.com/terms"
          className="text-[#D4AF37] hover:underline font-semibold"
        >
          Điều khoản dịch vụ
        </a>
        &nbsp;của Google
      </p>
    </div>
  );
};

export default Disclaimer;
