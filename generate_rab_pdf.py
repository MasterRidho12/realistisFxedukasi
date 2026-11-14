import os
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_decorations(self, page_count):
        self.saveState()
        self.setFont("Helvetica-Bold", 7.5)
        self.setFillColor(colors.HexColor("#64748b"))
        
        # Header line (all pages)
        self.drawString(42, 810, "REALISTIS FX EDUKASI  |  DOKUMEN RESMI RENCANA ANGGARAN BIAYA (RAB)")
        self.drawRightString(553, 810, "CONFIDENTIAL & OFFICIAL")
        self.setStrokeColor(colors.HexColor("#cbd5e1"))
        self.setLineWidth(0.75)
        self.line(42, 803, 553, 803)
            
        # Footer
        self.setStrokeColor(colors.HexColor("#cbd5e1"))
        self.setLineWidth(0.75)
        self.line(42, 38, 553, 38)
        
        self.setFont("Helvetica", 7.5)
        self.drawString(42, 26, "RealistisFx Edukasi • 100% Web-Based Architecture (No Third-Party Messaging Cost)")
        page_str = f"Halaman {self._pageNumber} dari {page_count}"
        self.drawRightString(553, 26, page_str)
        self.restoreState()

def generate_rab_pdf(output_path):
    # Printable area: 595.27 x 841.89
    # Left/Right: 42 -> width = 511.27
    # Top/Bottom: 45 -> height = 751.89
    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        leftMargin=42,
        rightMargin=42,
        topMargin=46,
        bottomMargin=46
    )

    styles = getSampleStyleSheet()

    # Base typography
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=16,
        leading=19,
        textColor=colors.HexColor('#0f172a')
    )

    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=12,
        textColor=colors.HexColor('#1e40af'),
        spaceAfter=6
    )

    h1_style = ParagraphStyle(
        'H1',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=13,
        textColor=colors.HexColor('#0f172a'),
        spaceBefore=7,
        spaceAfter=4
    )

    body_style = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=11.5,
        textColor=colors.HexColor('#334155')
    )

    body_bold = ParagraphStyle(
        'BodyBold',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=11.5,
        textColor=colors.HexColor('#0f172a')
    )

    tbl_header = ParagraphStyle(
        'TblHdr',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7.5,
        leading=9.5,
        textColor=colors.white
    )

    tbl_cell = ParagraphStyle(
        'TblCell',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.5,
        leading=9.5,
        textColor=colors.HexColor('#1e293b')
    )

    tbl_cell_bold = ParagraphStyle(
        'TblCellB',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7.5,
        leading=9.5,
        textColor=colors.HexColor('#0f172a')
    )

    tbl_cell_center = ParagraphStyle(
        'TblCellCenter',
        parent=tbl_cell,
        alignment=1
    )

    story = []

    # ================= PAGE 1 =================
    # Header Banner
    story.append(Paragraph("REALISTIS FX EDUKASI & TRADING INTELLIGENCE", title_style))
    story.append(Paragraph("PROPOSAL BIAYA GO-LIVE & KOMPARASI ARSITEKTUR CLOUD (VERSI 1,5 JT VS 2 JT)", subtitle_style))
    story.append(Spacer(1, 2))

    # Meta Table
    meta_data = [
        [
            Paragraph("<b>Nomor Dokumen:</b> RFX/RAB/2026/XI-001", body_style),
            Paragraph("<b>Target Domain:</b> Custom Domain Resmi (.com / .id)", body_style),
        ],
        [
            Paragraph("<b>Tanggal Penerbitan:</b> 14 November 2026", body_style),
            Paragraph("<b>Biaya Domain:</b> Rp 500.000 (Terkunci / 1 Tahun)", body_style),
        ],
        [
            Paragraph("<b>Distribusi Fitur:</b> 100% Web-Based (Zero WA/TG Blast)", body_style),
            Paragraph("<b>Status Sistem:</b> Siap Go-Live (Ready for Production)", body_style),
        ]
    ]
    meta_tbl = Table(meta_data, colWidths=[255, 256])
    meta_tbl.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#f8fafc')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#cbd5e1')),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor('#e2e8f0')),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(meta_tbl)
    story.append(Spacer(1, 4))

    # 1. Ringkasan Eksekutif
    story.append(Paragraph("1. Ringkasan Eksekutif & Fondasi 100% Web-Based", h1_style))
    p_exec = (
        "Dokumen ini merinci Rencana Anggaran Biaya (RAB) resmi untuk mempublikasikan website trading edukasi "
        "<b>RealistisFx</b> ke domain publik resmi dengan infrastruktur cloud yang aman, cepat, dan handal. "
        "Sesuai arahan, seluruh fitur — mencakup <b>News Radar Real-Time</b> (prediksi entry 2 arah Buy/Sell Stop, live spot TradingView), "
        "<b>Kalkulator Lot & Risk Management</b>, <b>Jurnal Trading</b>, <b>Trading Checklist</b>, serta <b>MT5 Investor Account Reader</b> — "
        "berjalan <b>100% murni di dalam web</b> tanpa ada sinyal yang dikirim via bot WA/Telegram. Pendekatan web-centric ini "
        "mengeliminasi biaya API blast bulanan pihak ketiga dan menjamin privasi serta kemudahan akses pengguna."
    )
    story.append(Paragraph(p_exec, body_style))
    story.append(Spacer(1, 4))

    # 2. Paket 1,5 Juta
    story.append(Paragraph("2. Rincian Anggaran Paket Standar: Cloud Serverless (Total: Rp 1.500.000)", h1_style))
    rab1_data = [
        [
            Paragraph("No", tbl_header),
            Paragraph("Komponen Infrastruktur", tbl_header),
            Paragraph("Spesifikasi Teknis", tbl_header),
            Paragraph("Durasi", tbl_header),
            Paragraph("Alokasi Biaya", tbl_header)
        ],
        [
            Paragraph("1", tbl_cell_center),
            Paragraph("<b>Custom Domain Resmi</b>", tbl_cell_bold),
            Paragraph("Domain resmi (.com / .id), premium registrar, privacy WHOIS protection aktif", tbl_cell),
            Paragraph("1 Tahun", tbl_cell_center),
            Paragraph("Rp 500.000", tbl_cell_bold)
        ],
        [
            Paragraph("2", tbl_cell_center),
            Paragraph("<b>Web Hosting Cloud Edge</b>", tbl_cell_bold),
            Paragraph("Next.js 16 Edge CDN Global, auto SSL TLS 1.3, unmetered bandwidth edukasi", tbl_cell),
            Paragraph("1 Tahun", tbl_cell_center),
            Paragraph("Rp 450.000", tbl_cell_bold)
        ],
        [
            Paragraph("3", tbl_cell_center),
            Paragraph("<b>Managed Cloud Database</b>", tbl_cell_bold),
            Paragraph("PostgreSQL Region Singapore (latensi <50ms), kuota riwayat hingga ~50.000 log jurnal", tbl_cell),
            Paragraph("1 Tahun", tbl_cell_center),
            Paragraph("Rp 400.000", tbl_cell_bold)
        ],
        [
            Paragraph("4", tbl_cell_center),
            Paragraph("<b>Keamanan & DNS Cloudflare</b>", tbl_cell_bold),
            Paragraph("WAF Layer-7 DDoS mitigation, auto DNS routing cepat, SSL certificate valid", tbl_cell),
            Paragraph("1 Tahun", tbl_cell_center),
            Paragraph("Rp 150.000", tbl_cell_bold)
        ],
        [
            Paragraph("", tbl_cell),
            Paragraph("<b>TOTAL BIAYA PAKET STANDAR</b>", tbl_cell_bold),
            Paragraph("<b>Infrastruktur Cloud Serverless Siap Pakai 1 Tahun Penuh</b>", tbl_cell),
            Paragraph("<b>1 Tahun</b>", tbl_cell_center),
            Paragraph("<b>Rp 1.500.000</b>", ParagraphStyle('Tot1', parent=tbl_cell_bold, textColor=colors.HexColor('#1e40af'), fontSize=8))
        ]
    ]
    t1 = Table(rab1_data, colWidths=[20, 115, 230, 50, 96])
    t1.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#1e3a8a')),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#cbd5e1')),
        ('INNERGRID', (0,0), (-1,-2), 0.5, colors.HexColor('#e2e8f0')),
        ('BACKGROUND', (0,-1), (-1,-1), colors.HexColor('#f1f5f9')),
        ('LINEABOVE', (0,-1), (-1,-1), 1.2, colors.HexColor('#1e3a8a')),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('LEFTPADDING', (0,0), (-1,-1), 5),
        ('RIGHTPADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(t1)
    story.append(Spacer(1, 5))

    # 3. Paket 2 Juta
    story.append(Paragraph("3. Rincian Anggaran Paket Pro: Dedicated VPS Engine (Total: Rp 2.000.000)", h1_style))
    rab2_data = [
        [
            Paragraph("No", tbl_header),
            Paragraph("Komponen Infrastruktur", tbl_header),
            Paragraph("Spesifikasi Teknis", tbl_header),
            Paragraph("Durasi", tbl_header),
            Paragraph("Alokasi Biaya", tbl_header)
        ],
        [
            Paragraph("1", tbl_cell_center),
            Paragraph("<b>Custom Domain Resmi</b>", tbl_cell_bold),
            Paragraph("Domain resmi (.com / .id), premium registrar, privacy WHOIS protection aktif", tbl_cell),
            Paragraph("1 Tahun", tbl_cell_center),
            Paragraph("Rp 500.000", tbl_cell_bold)
        ],
        [
            Paragraph("2", tbl_cell_center),
            Paragraph("<b>Dedicated Cloud VPS Singapore</b>", tbl_cell_bold),
            Paragraph("2 vCPU, 4GB RAM, NVMe SSD, daemon backend 24/7 untuk MT5 reader & auto fetch", tbl_cell),
            Paragraph("1 Tahun*", tbl_cell_center),
            Paragraph("Rp 700.000", tbl_cell_bold)
        ],
        [
            Paragraph("3", tbl_cell_center),
            Paragraph("<b>Dedicated High-Speed DB</b>", tbl_cell_bold),
            Paragraph("PostgreSQL dedicated instance (<10ms ping lokal VPS), unmetered storage jurnal", tbl_cell),
            Paragraph("1 Tahun", tbl_cell_center),
            Paragraph("Rp 400.000", tbl_cell_bold)
        ],
        [
            Paragraph("4", tbl_cell_center),
            Paragraph("<b>Next.js HA Web Frontend</b>", tbl_cell_bold),
            Paragraph("Production optimized web app, Nginx reverse proxy dengan caching statis ultra-cepat", tbl_cell),
            Paragraph("1 Tahun", tbl_cell_center),
            Paragraph("Rp 300.000", tbl_cell_bold)
        ],
        [
            Paragraph("5", tbl_cell_center),
            Paragraph("<b>Cloudflare Pro & Anti-Spike</b>", tbl_cell_bold),
            Paragraph("Perlindungan lonjakan akses saat High Impact News rilis (NFP, FOMC, CPI) tanpa lag", tbl_cell),
            Paragraph("1 Tahun", tbl_cell_center),
            Paragraph("Rp 100.000", tbl_cell_bold)
        ],
        [
            Paragraph("", tbl_cell),
            Paragraph("<b>TOTAL BIAYA PAKET PRO</b>", tbl_cell_bold),
            Paragraph("<b>Dedicated Server Engine 24/7 + Database Unmetered + Anti-Spike</b>", tbl_cell),
            Paragraph("<b>1 Tahun</b>", tbl_cell_center),
            Paragraph("<b>Rp 2.000.000</b>", ParagraphStyle('Tot2', parent=tbl_cell_bold, textColor=colors.HexColor('#047857'), fontSize=8))
        ]
    ]
    t2 = Table(rab2_data, colWidths=[20, 115, 230, 50, 96])
    t2.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#065f46')),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#cbd5e1')),
        ('INNERGRID', (0,0), (-1,-2), 0.5, colors.HexColor('#e2e8f0')),
        ('BACKGROUND', (0,-1), (-1,-1), colors.HexColor('#f0fdf4')),
        ('LINEABOVE', (0,-1), (-1,-1), 1.2, colors.HexColor('#065f46')),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('LEFTPADDING', (0,0), (-1,-1), 5),
        ('RIGHTPADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(t2)
    story.append(Spacer(1, 2))
    story.append(Paragraph("<font size='6.5' color='#64748b'>* Catatan: VPS Singapore terhubung langsung ke gateway broker utama (IC Markets, Exness, XM, HFM) dengan latensi 1-3ms.</font>", body_style))

    # Force clean page break to Page 2
    story.append(PageBreak())

    # ================= PAGE 2 =================
    # 4. Matriks Perbedaan Teknis
    story.append(Paragraph("4. Matriks Perbandingan Teknis Detail: Versi 1,5 Juta vs 2 Juta", h1_style))
    comp_data = [
        [
            Paragraph("Aspek / Fitur Sistem", tbl_header),
            Paragraph("Paket Standar (Rp 1.500.000 / Serverless)", tbl_header),
            Paragraph("Paket Pro (Rp 2.000.000 / Dedicated VPS)", tbl_header)
        ],
        [
            Paragraph("<b>Biaya Alokasi Domain</b>", tbl_cell),
            Paragraph("Rp 500.000 (Sama, Domain Resmi .com / .id)", tbl_cell_center),
            Paragraph("Rp 500.000 (Sama, Domain Resmi .com / .id)", tbl_cell_center)
        ],
        [
            Paragraph("<b>Arsitektur Komputasi</b>", tbl_cell),
            Paragraph("Serverless Function (Sleep mode saat tidak ada request)", tbl_cell),
            Paragraph("<b>Dedicated VPS 24/7 Always-On</b> (Standby 24 jam nonstop)", tbl_cell_bold)
        ],
        [
            Paragraph("<b>Sinkronisasi MT5 Investor</b>", tbl_cell),
            Paragraph("On-Demand Sync (Data ditarik saat user membuka halaman web)", tbl_cell),
            Paragraph("<b>Continuous Background Sync</b> (Histori trade ditarik otomatis 24 jam)", tbl_cell_bold)
        ],
        [
            Paragraph("<b>Ketahanan Saat News Spike</b><br/>(NFP, FOMC, CPI, Suku Bunga)", tbl_cell),
            Paragraph("Standar (Berbagi resource serverless, potensi throttling)", tbl_cell),
            Paragraph("<b>Sangat Tangguh</b> (Dedicated RAM 4GB & CPU eksklusif, bebas throttling)", tbl_cell_bold)
        ],
        [
            Paragraph("<b>Latensi & Ping ke Broker</b>", tbl_cell),
            Paragraph("~40ms - 80ms (Multi-hop cloud routing)", tbl_cell),
            Paragraph("<b>< 10ms - 15ms</b> (Direct Datacenter Singapore)", tbl_cell_bold)
        ],
        [
            Paragraph("<b>Kapasitas Riwayat Jurnal</b>", tbl_cell),
            Paragraph("Maksimal ~50.000 entri transaksi", tbl_cell),
            Paragraph("<b>Unlimited / Tanpa Batas</b> (Tergantung storage NVMe VPS)", tbl_cell_bold)
        ],
        [
            Paragraph("<b>Keamanan & Proteksi DDoS</b>", tbl_cell),
            Paragraph("Cloudflare Standard WAF & SSL", tbl_cell),
            Paragraph("<b>Cloudflare Pro + Failover Protection & Auto-Backup</b>", tbl_cell_bold)
        ],
        [
            Paragraph("<b>Distribusi Sinyal & Fitur</b>", tbl_cell),
            Paragraph("100% Web UI (Zero SMS / WhatsApp blast fee)", tbl_cell_center),
            Paragraph("100% Web UI (Zero SMS / WhatsApp blast fee)", tbl_cell_center)
        ]
    ]
    t_comp = Table(comp_data, colWidths=[130, 190, 191])
    t_comp.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#0f172a')),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#cbd5e1')),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor('#e2e8f0')),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor('#f8fafc')]),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('LEFTPADDING', (0,0), (-1,-1), 5),
        ('RIGHTPADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(t_comp)
    story.append(Spacer(1, 6))

    # 5. Rekomendasi Pemilihan
    story.append(Paragraph("5. Panduan Pemilihan & Rekomendasi Solusi", h1_style))
    p_recom = (
        "<b>• Kapan Memilih Paket 1,5 Juta:</b> Pilihan ideal bila situs ditujukan sebagai portal edukasi awal, media rujukan "
        "sinyal news radar, dan kalkulator lot bagi member komunitas dengan traffic pengguna berkala. Tidak memerlukan maintenance rumit.<br/>"
        "<b>• Kapan Memilih Paket 2 Juta (Sangat Direkomendasikan):</b> Pilihan terbaik bila ingin kehandalan mutlak saat "
        "pergerakan harga ekstrim (News Spike NFP/CPI), pembacaan akun investor MT5 yang tersinkronisasi 24 jam nonstop tanpa jeda loading, "
        "serta ruang simpan histori jurnal trading tak terbatas untuk portofolio jangka panjang."
    )
    story.append(Paragraph(p_recom, body_style))
    story.append(Spacer(1, 6))

    # 6. Tahapan Pengerjaan
    story.append(Paragraph("6. Tahapan Pengerjaan & Timeline Deployment (1-2 Hari Kerja)", h1_style))
    p_steps = (
        "1. <b>Registrasi & Konfigurasi Domain:</b> Pembelian domain resmi pilihan (.com / .id) budget Rp 500rb dan setup DNS Cloudflare.<br/>"
        "2. <b>Provisioning Infrastruktur:</b> Setup server hosting / VPS Singapore dan instalasi database PostgreSQL berkecepatan tinggi.<br/>"
        "3. <b>Build & Deployment Production:</b> Kompilasi Next.js 16, integrasi stream harga real-time TradingView & kalender ForexFactory.<br/>"
        "4. <b>Quality Assurance & Security Test:</b> Pengujian kalkulator lot, checklist, sinkronisasi akun investor, dan verifikasi SSL HTTPS.<br/>"
        "5. <b>Handover & Go-Live:</b> Penyerahan akses kepemilikan domain, kredensial administratif, dan website resmi aktif beroperasi."
    )
    story.append(Paragraph(p_steps, body_style))
    story.append(Spacer(1, 12))

    # 7. Pengesahan
    story.append(Paragraph("7. Lembar Pengesahan & Konfirmasi Persetujuan", h1_style))
    sign_data = [
        [
            Paragraph("Diajukan Oleh (Lead Technical Developer):", body_style),
            Paragraph("Disetujui Oleh (Project Owner / Trader):", body_style)
        ],
        [
            Spacer(1, 36),
            Spacer(1, 36)
        ],
        [
            Paragraph("<b>( Tim Developer RealistisFx )</b>", body_style),
            Paragraph("<b>( .............................................................. )</b>", body_style)
        ],
        [
            Paragraph("<font color='#64748b' size='7'>Tanggal: 14 November 2026</font>", body_style),
            Paragraph("<font color='#64748b' size='7'>Tanggal: ................................................</font>", body_style)
        ]
    ]
    sign_table = Table(sign_data, colWidths=[255, 256])
    sign_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 1),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
    ]))
    story.append(KeepTogether(sign_table))

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"SUCCESS: Generated exactly 2-page document at {output_path}")

if __name__ == '__main__':
    target = os.path.abspath("c:/realistisfxedukas/RAB_Online_RealistisFx.pdf")
    generate_rab_pdf(target)
