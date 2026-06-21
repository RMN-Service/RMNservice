/**
 * Core Compatibility Engine v1.0
 * Часть системы стоимостью $50,000
 */

class CompatibilityService {
    /**
     * Комплексная проверка совместимости всей сборки
     */
    validateFullBuild(build) {
        const results = [];
        const { cpu, motherboard, ram, gpu, psu, case: pcCase } = build;

        if (cpu && motherboard) {
            results.push(this.checkCpuAndMotherboard(cpu, motherboard));
        }

        if (motherboard && ram) {
            results.push(this.checkRamCompatibility(motherboard, ram));
        }

        if (pcCase && motherboard) {
            results.push(this.checkFormFactor(pcCase, motherboard));
        }

        if (psu && build) {
            const components = Object.values(build).filter(c => c && c.category !== 'psu');
            results.push(this.checkPowerSupply(components, psu));
        }

        return {
            isValid: results.every(r => r.compatible),
            errors: results.filter(r => !r.compatible).map(r => r.reason)
        };
    }

    checkCpuAndMotherboard(cpu, motherboard) {
        const cpuSocket = cpu.specifications.socket;
        const mbSocket = motherboard.specifications.socket;

        if (cpuSocket !== mbSocket) {
            return {
                compatible: false,
                reason: `Несовместимые сокеты: Процессор (${cpuSocket}) и Материнская плата (${mbSocket})`
            };
        }
        return { compatible: true };
    }

    checkRamCompatibility(motherboard, ram) {
        if (motherboard.specifications.ramType !== ram.specifications.ramType) {
            return {
                compatible: false,
                reason: `Тип памяти не поддерживается: МП требует ${motherboard.specifications.ramType}, выбрано ${ram.specifications.ramType}`
            };
        }
        return { compatible: true };
    }

    checkFormFactor(pcCase, motherboard) {
        const supportedFactors = pcCase.specifications.supportedFormFactors; // ['ATX', 'mATX']
        if (!supportedFactors.includes(motherboard.specifications.formFactor)) {
            return {
                compatible: false,
                reason: `Корпус не поддерживает форм-фактор ${motherboard.specifications.formFactor}`
            };
        }
        return { compatible: true };
    }

    checkPowerSupply(components, psu) {
        const totalTDP = components.reduce((sum, item) => sum + (item.specifications.tdp || 0), 0);
        const recommendedPower = totalTDP * 1.25; // Запас 25% для стабильности

        if (psu.specifications.wattage < recommendedPower) {
            return {
                compatible: false,
                reason: `Недостаточная мощность БП: Требуется ~${Math.round(recommendedPower)}W, выбрано ${psu.specifications.wattage}W`
            };
        }

        return { compatible: true };
    }
}
module.exports = new CompatibilityService();
